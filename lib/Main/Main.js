import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import { withRouter } from 'react-router';
import Link from 'react-router-dom/Link';
// Folio
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Button from '@folio/stripes-components/lib/Button';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import CheckBox from '@folio/stripes-components/lib/Checkbox';
import FilterPaneSearch from '@folio/stripes-components/lib/FilterPaneSearch';
import FilterGroups, { initialFilterState, onChangeFilter as commonChangeFilter } from '@folio/stripes-components/lib/FilterGroups/FilterGroups';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
// Components and Pages
import PaneDetails from '../PaneDetails';

class Main extends Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    // react-route properties provided by withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired, 
    history: PropTypes.object.isRequired
  };

  static manifest = Object.freeze({
    vendor: {
      type: 'okapi',
      records: 'vendor',
      path: 'vendor'
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      filters: { },
      searchTerm: 'this is string',
      selectedRow: {},
      paneTitle: "",
      paneDetailsStatus: false,
      paneWidth: '50%',
      dataListingFullWidth: true,
      paneDetailsLoading: false,
    };
    // In Filters
    this.commonChangeFilter = commonChangeFilter.bind(this);  
    this.transitionToParams = transitionToParams.bind(this);
        // Vendor Button
    this.addNewVendor = this.addNewVendor.bind(this);
    this.onCloseDetails = this.onCloseDetails.bind(this);
    this.updatePaneStatus = this.updatePaneStatus.bind(this);
  }
  
  render() {
    const { match, location, history } = this.props;
    const searchHeader = (<FilterPaneSearch
      searchFieldId='input-user-search'
      onChange={this.onChangeSearch.bind(this)}
      onClear={this.onClearSearch.bind(this)}
      value={this.state.searchTerm}
    />);
    // Check State
    // For filter
    const filterConfig = [
      {
        label: 'Item Types',
        name: 'item',
        cql: 'materialType',
        values: ['Books', 'DVDs', 'Microfilm'],
      }, {
        label: 'Location',
        name: 'location',
        cql: 'location.name',
        values: [{ name: 'Main Library', cql: 'main' }, 'Annex Library'],
      },
    ];
    // For listing
    const catalogResults = [
      {
        vendor_name: 'Biology Today',
        id: '199930490002',
      },
      {
        vendor_name: 'Financial Matters',
        id: '199930490034',
      },
      {
        vendor_name: 'Modern Microbiotics',
        id: '199930490064',
      },
    ]

    const newVendorButton = (
      <PaneMenu>
        <Button id={`clickable-new`} title={`Add New`} onClick={this.addNewVendor} buttonStyle="primary paneHeaderNewButton">+ New</Button>
      </PaneMenu>
    );
    return (
      <Paneset>
        <Pane paneTitle="Filters" defaultWidth="20%" header={searchHeader}>
          <FilterGroups
              config={filterConfig}
              filters={this.state.filters}
              onChangeFilter={this.onChangeFilter.bind(this)}
            />
        </Pane>
        <Pane paneTitle="Data listing" defaultWidth='fill' lastMenu={newVendorButton}>
          <MultiColumnList
            autosize
            virtualize
            id={`list-${this.props.moduleName}`}
            contentData={catalogResults}
            selectedRow={this.state.selectedRow}
            onRowClick={this.onSelectRow}
            // onHeaderClick={this.onSort}
            // onNeedMoreData={this.onNeedMore}
            // visibleColumns={this.props.visibleColumns}
            sortedColumn="id"
            sortOrder="ascending"
            sortDirection="ascending"
            // isEmptyMessage={`No results found${maybeTerm}. Please check your ${maybeSpelling}filters.`}
            // columnMapping={this.props.columnMapping}
            // loading={this.state.paneDetailsLoading}
            // ariaLabel={`${objectNameUC} search results`}
            // rowFormatter={this.anchoredRowFormatter}
            // containerRef={(ref) => { this.resultsList = ref; }}
          />
        </Pane>
        <PaneDetails updatePaneStatus={this.updatePaneStatus} onCloseDetails={this.onCloseDetails} {...this.state} {...this.props} />
      </Paneset>
    );
  }

  onClearSearch = (e) => {
    const path = this.props.initialPath;
    this.setState({
      searchTerm: '',
    });
  }
  onChangeSearch = (e) => {
    const query = e.target.value;
    this.setState({ searchTerm: query });
  }
  onChangeFilter = (e) => {
    this.commonChangeFilter(e);
  }
  updateFilters = (filters) => { // provided for onChangeFilter
    this.transitionToParams({ filters: Object.keys(filters).filter(key => filters[key]).join(',') });
  }
  onSelectRow = (e, row) => {
    let getRowId = { id: row.id };
    this.setState({
      selectedRow: getRowId, paneID: "vendorDetails", paneTitle: "Vendor Details", paneDetailsStatus: true, dataListingFullWidth: false });
    this.props.history.push(`/vendors/view/${row.id}`);
  }
  addNewVendor = () => {
    this.setState({ paneID: "addNewVendor", paneTitle: "Add New Vendor", paneDetailsStatus: true, dataListingFullWidth: false });
    this.props.history.push(`/vendors/new/123456`);
  }
  onCloseDetails = () => {
    this.setState({ paneID: "", paneTitle: "",  paneDetailsStatus: false, dataListingFullWidth: true });
    this.props.history.push(`/vendors/`);
  }
  updatePaneStatus = () => {
    console.log(this.props);
  }
} 

export default withRouter(Main);