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
import css from './Main.css';

class Main extends Component {
  static manifest = Object.freeze({
    localRes: {},
    vendor: {
      type: 'okapi',
      records: 'vendors',
      path: 'vendor',
    },
    vendorGETID: {
      type: 'okapi',
      path: 'vendor/%{localRes.id}'
    },
    vendorCategory: {
      type: 'okapi',
      records: 'categories',
      path: 'vendor_category'
    },
    vendorContactCategory: {
      type: 'okapi',
      records: 'categories',
      path: 'contact_category'
    },
  });

  static handler(e) {
    console.log("TenantList ERROR: in module '" + e.module + "', " +
      " operation '" + e.op + "' on " +
      " resource '" + e.resource + "' failed, saying: " + e.error);
  }

  constructor(props) {
    super(props);
    this.state = {
      filters: { },
      searchTerm: 'Keyword goes here',
      selectedRow: {},
      paneDetailsLoading: false,
      is_vendor_data: false
    };
    // In Filters
    this.commonChangeFilter = commonChangeFilter.bind(this);  
    this.transitionToParams = transitionToParams.bind(this);
        // Vendor Button
    this.addNewVendor = this.addNewVendor.bind(this);
    this.onCloseDetails = this.onCloseDetails.bind(this);
    this.updatePaneStatus = this.updatePaneStatus.bind(this);
    this.getAllData = this.getAllData.bind(this);
  }
  
  render() {

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
        vendor_name: 'Gobi',
        id: '588b5c42-8634-4af7-bc9b-5e0116ed96b6',
      },
      {
        vendor_name: 'Billy',
        id: '588b5c42-8634-4af7-bc9b-5e0116ed96b6',
      },
    ]

    const records = this.getAllData() != null ? this.getAllData() : [];

    const newVendorButton = (
      <PaneMenu>
        <Button id={`clickable-new`} title={`Add New`} onClick={this.addNewVendor} buttonStyle="primary paneHeaderNewButton">+ New</Button>
      </PaneMenu>
    );
    return (
      <Paneset>
        {/*<Pane paneTitle="Filters" defaultWidth="20%" header={searchHeader}>
          <FilterGroups
              config={filterConfig}
              filters={this.state.filters}
              onChangeFilter={this.onChangeFilter.bind(this)}
            />
        </Pane>*/}
        <Pane paneTitle="Data listing" defaultWidth='fill' lastMenu={newVendorButton}>
          <div className={css.searchHeader}>
            {searchHeader}
          </div>
          <MultiColumnList
            autosize
            virtualize
            id={`list-${this.props.moduleName}`}
            contentData={records}
            selectedRow={this.state.selectedRow}
            onRowClick={this.onSelectRow}
            // onHeaderClick={this.onSort}
            // onNeedMoreData={this.onNeedMore}
            visibleColumns={['name', 'id']}
            sortedColumn={"name"}
            // sortOrder="descending"
            // sortDirection="ascending"
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

  getAllData() {
    let data = null;
    if (this.props.resources.vendor != null) {
      if (this.props.resources.vendor.hasLoaded) {
        data = this.props.resources.vendor.records;
      }
    }
    return data;
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
    this.props.history.push(`/vendors/edit/${row.id}`);
  }
  addNewVendor = () => {
    this.props.history.push(`/vendors/new`);
  }
  onCloseDetails = () => {
    this.props.history.push(`/vendors/`);
  }
  updatePaneStatus = () => {
    console.log(this.props);
  }
}

export default withRouter(Main);