import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import _ from "lodash";
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
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import { filters2cql } from '@folio/stripes-components/lib/FilterGroups';
import FilterGroups, { initialFilterState, onChangeFilter as commonChangeFilter } from '@folio/stripes-components/lib/FilterGroups/FilterGroups';
import Icon from '@folio/stripes-components/lib/Icon';
// Components and Pages
import PaneDetails from '../PaneDetails';
import css from './Main.css';
import { SetFiltersOnLoad } from '../utils/SetFiltersOnLoad';

const filterConfig = [
  {
    label: 'Vendor Status',
    name: 'vendor_status',
    cql: 'vendor_status',
    values: ['Active', 'Pending', 'Inactive'],
  }
];

class Main extends Component {
  static manifest = Object.freeze({
    localRes: {},
    vendor: {
      type: 'okapi',
      records: 'vendors',
      path: 'vendor'
    },
    vendorQuery: {
      type: 'okapi',
      records: 'vendors',
      path: 'vendor',
      params: {
        limit: '1000',
        query: '%{localRes.query}'
      }
    },
    vendorGETID: {
      type: 'okapi',
      path: 'vendor/%{localRes.id}',
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

  constructor(props) {
    super(props);

    const query = props.location.query || {};
    console.log(props.location);
    this.state = {
      filters: initialFilterState(filterConfig, query.filters),
      searchTerm: '',
      selectedRow: {},
      paneDetailsLoading: false
    };
    // In Filters
    this.onChangeFilter = this.onChangeFilter.bind(this);  
    this.onClearFilter = this.onClearFilter.bind(this);  
    this.onClearAllFilters = this.onClearAllFilters.bind(this);  
    this.transitionToParams = transitionToParams.bind(this);
        // Vendor Button
    this.addNewVendor = this.addNewVendor.bind(this);
    this.onCloseDetails = this.onCloseDetails.bind(this);
    this.updateStateFilter = this.updateStateFilter.bind(this);
    this.getAllData = this.getAllData.bind(this);
    // Get User
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  componentWillMount() {
    this.getCurrentUser();
    SetFiltersOnLoad(this.props, this.updateStateFilter);
  }
  
  render() {
    console.log(this.props);
    const searchHeader = (<FilterPaneSearch
      searchFieldId='input-user-search'
      onChange={this.onChangeSearch.bind(this)}
      onClear={this.onClearSearch.bind(this)}
      value={this.state.searchTerm}
    />);
    
    const records = this.getAllData() != null ? _.orderBy(this.getAllData(), ['name'], ['asc']) : [];
    const is_preloader = this.getAllData() === null ? true : false;
    const newVendorButton = (
      <PaneMenu>
        <Button id={`clickable-new`} title={`Add New`} onClick={this.addNewVendor} buttonStyle="primary paneHeaderNewButton">+ New</Button>
      </PaneMenu>
    );
    return (
      <Paneset>
        <Pane paneTitle="Filters" defaultWidth="20%">
          <FilterGroups
            config={filterConfig} 
            filters={this.state.filters}
            onChangeFilter={this.onChangeFilter}
            onClearFilter={this.onClearFilter}
            onClearAllFilters={this.onClearAllFilters}
          />
        </Pane>
        <Pane paneTitle="Vendor Listing" defaultWidth='fill' lastMenu={newVendorButton}>
          <div className={css.searchHeader}>
            {searchHeader}
          </div>
          <MultiColumnList
            id={`list-multilist`}
            contentData={records}
            selectedRow={this.state.selectedRow}
            onRowClick={this.onSelectRow}
            columnWidths={{name: '50%', vendor_status: '25%'}}
            visibleColumns={['name', 'vendor_status']}
            sortedColumn={"name"}
            loading={is_preloader}
          />
        </Pane>
        <PaneDetails onCloseDetails={this.onCloseDetails} {...this.state} {...this.props} />
      </Paneset>
    );
  }

  getAllData() {
    let data = null;
    if (this.props.resources.vendorQuery != null) {
      if (this.props.resources.vendorQuery.hasLoaded) {
        data = this.props.resources.vendorQuery.records;
      }
    }
    return data;
  }
  getCurrentUser() {
    let data = null;
    if (this.props.okapi.currentUser != null) {
      data = this.props.okapi.currentUser;
      this.props.mutator.localRes.update({ currentUser: data });
    }
    return data;
  }
  onClearSearch = (e) => {
    const path = this.props.initialPath;
    this.setState({ searchTerm: '' });
    this.props.mutator.localRes.update({ query: 'query=(name=*)' });
  }
  onChangeSearch = (e) => {
    const query = e.target.value;
    const localres = this.props.mutator.localRes;
    const filter = this.props.resources.localRes.filter || '*';
    console.log(query);
    console.log(filter);
    if(query.trim().length > 0) {
      this.props.mutator.localRes.update({ query: 'query=(name=' + query + '*) and vendor_status=(' + filter + ')' });
    } else {
      this.props.mutator.localRes.update({ query: 'query=(name=*) and vendor_status=(' + filter + ')' });
    }
    this.setState({ searchTerm: query });
    
  }
  onChangeFilter = (e) => {
    const filters = Object.assign({}, this.state.filters);
    filters[e.target.name] = e.target.checked;
    this.setState({ filters });
    this.transitionToParams({ filters: Object.keys(filters).filter(key => filters[key]).join(',') });

  }
  onClearFilter = (e) => {
    console.log('clear filter');
  }
  onClearAllFilters = (e) => {
    console.log('clear filter');
  }
  onSelectRow = (e, row) => {
    let getRowId = { id: row.id };
    this.props.mutator.localRes.update({ id: `${row.id}` });
    this.props.history.push(`/vendors/view/${row.id}`);
  }
  addNewVendor = () => {
    this.props.history.push(`/vendors/new`);
  }
  onCloseDetails = () => {
    this.props.history.push(`/vendors/`);
  }
  updateStateFilter = (filters) => {
    this.setState({ filters });
  }
}

export default withRouter(Main);