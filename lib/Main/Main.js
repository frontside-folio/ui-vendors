import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import _ from "lodash";
import queryString from 'query-string';
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
import FilterGroups, { initialFilterState, filterState, filters2cql, onChangeFilter as commonChangeFilter, handleFilterClear } from '@folio/stripes-components/lib/FilterGroups';
import Icon from '@folio/stripes-components/lib/Icon';
// Components and Pages
import PaneDetails from '../PaneDetails';
import css from './Main.css';

const filterConfig = [
  {
    label: 'Vendor Status',
    name: 'vendor_status',
    cql: 'vendor_status',
    values: ['Active', 'Pending', 'Inactive']
  },
  {
    label: 'Payment Method',
    name: 'payment_method',
    cql: 'payment_method',
    values: ['EFT', 'Bank Draft', 'Paper Check', 'Credit Card/P-Card', 'Cash'],
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
        query: '%{localRes.query} %{localRes.filter} sortby %{localRes.sortBy}'
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
    const query = queryString.parse(location.search).filters ? queryString.parse(location.search).filters : '';
    this.state = {
      filters: filterState(query),
      searchTerm: '',
      selectedRow: {}
    };
    // Filters
    this.onChangeFilter = this.onChangeFilter.bind(this);  
    this.onClearFilter = this.onClearFilter.bind(this);  
    this.onChangeFilterUpdateQuery = this.onChangeFilterUpdateQuery.bind(this);
    this.onHeaderClick = this.onHeaderClick.bind(this);
    this.transitionToParams = transitionToParams.bind(this);
    // Set Default query
    this.setDefaultQuery = this.setDefaultQuery.bind(this);
    // Vendor Button
    this.addNewVendor = this.addNewVendor.bind(this);
    this.onCloseDetails = this.onCloseDetails.bind(this);
    this.getAllData = this.getAllData.bind(this);
    // Get User
    this.getCurrentUser = this.getCurrentUser.bind(this);
    // Preloader Status 
    this.preloaderStatus = this.preloaderStatus.bind(this);
  }

  componentWillMount() {
    this.getCurrentUser();
    this.setDefaultQuery();
  }
  
  render() {
    const searchHeader = (<FilterPaneSearch
      searchFieldId='input-user-search'
      onChange={this.onChangeSearch.bind(this)}
      onClear={this.onClearSearch.bind(this)}
      value={this.state.searchTerm}
    />);

    const sortBy = this.props.resources.localRes ? this.props.resources.localRes.sortBy : 'name';
    const sortOrder = this.props.resources.localRes ? this.props.resources.localRes.sortOrder : 'desc';
    const records = this.getAllData() != null ? _.orderBy(this.getAllData(), [sortBy], [sortOrder]) : [];
    const preloaderStatus = this.preloaderStatus();
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
          />
        </Pane>
        <Pane paneTitle="Vendor Listing" defaultWidth='fill' lastMenu={newVendorButton}>
          <div className={css.searchHeader}>
            {searchHeader}
          </div>
          <MultiColumnList
            virtualize  
            id={`list-multilist`}
            contentData={records}
            selectedRow={this.state.selectedRow}
            onRowClick={this.onSelectRow}
            onHeaderClick = {this.onHeaderClick}
            columnWidths={{ name: '50%', vendor_status: '25%', payment_method: '25%'}}
            visibleColumns={['name', 'vendor_status', 'payment_method']}
            sortedColumn={sortBy}
            sortDirection={`${sortOrder}ending`}
          />
          {preloaderStatus && 
            <Icon icon="spinner-ellipsis" width="100px" />
          }
        </Pane>
        <PaneDetails onCloseDetails={this.onCloseDetails} {...this.state} {...this.props} />
      </Paneset>
    );
  }

  preloaderStatus() {
    const res = this.props.resources;
    if (res.localRes !== null) {
      if(res.localRes.listPreloaderStatus !== null) {
        const status = res.localRes.listPreloaderStatus;
        return status;
      }
    }
    return true;
  }

  setDefaultQuery() {
    const filtersURL = queryString.parse(location.search).filters ? queryString.parse(location.search).filters : '';
    var sortBy = 'name';
    var sortOrder = 'asc';
    var url = queryString.parse(location.search).sort;
    if (url) {
      if (_.includes(url, '-')) {
        sortBy = url.substr(1);
        sortOrder = 'desc'
      } else {
        sortBy = url;
      }
    }
    var query = 'query=(name=*)';
    var filter = filters2cql(filterConfig, filtersURL) ? 'and ' + filters2cql(filterConfig, filtersURL) : '';
    this.props.mutator.localRes.update({ query: `${query}`, filter: filter, sortBy: sortBy, sortOrder: sortOrder, listPreloaderStatus: true, detailsPreloaderStatus: true });
  }
  // Data
  getAllData() {
    let data = null;
    if (this.props.resources.vendorQuery !== null) {
      if (this.props.resources.vendorQuery.hasLoaded) {
        return data = this.props.resources.vendorQuery.records || {};
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
  // Search Bar
  onClearSearch = (e) => {
    this.setState({ searchTerm: '' });
    this.props.mutator.localRes.update({ query: 'query=(name=*)' });
  }
  onChangeSearch = (e) => {
    const query = e.target.value;
    const updateQuery = query.trim().length > 0 ? query : '*'
    this.props.mutator.localRes.update({ query: 'query=(name=' + updateQuery  + '*)' });
    this.setState({ searchTerm: query });
  }
  // Filters
  onChangeFilter = (e) => {
    const filters = Object.assign({}, this.state.filters);
    filters[e.target.name] = e.target.checked;
    this.setState({ filters });
    var filterCQL = Object.keys(filters).filter(key => filters[key]).join(',');
    this.transitionToParams({ filters: filterCQL });
    this.onChangeFilterUpdateQuery(filterCQL);
  }
  onChangeFilterUpdateQuery(filterCQL) {
    const filter = filterCQL ? 'and ' + filters2cql(filterConfig, filterCQL) : '';
    this.props.mutator.localRes.update({ filter: filter, listPreloaderStatus: true });
  }
  onClearFilter = (name) => {
    const parsed = queryString.parse(this.props.location.search);
    const filters = filterState(parsed.filters);
    Object.keys(filters).forEach((key) => {
      if (key.startsWith(`${name}.`)) {
        filters[key] = false;
      }
    });
    this.setState({ filters });
    var filterCQL = Object.keys(filters).filter(key => filters[key]).join(',');
    this.transitionToParams({ filters: filterCQL });
    this.onChangeFilterUpdateQuery(filterCQL);
  }
  // Multi list
  onSelectRow = (e, row) => {
    let getRowId = { id: row.id };
    this.props.mutator.localRes.update({ id: `${row.id}` });
    this.props.history.push(`/vendors/view/${row.id}`);
  }
  onHeaderClick = (e, data) => {
    const localRes = this.props.resources.localRes;
    const preSortBy = localRes.sortBy;
    const preSortOrder = localRes.sortOrder;
    const curSortBy = data.name;
    let sortBy = preSortBy;
    let sortOrder = preSortOrder;
    let sortOrderSign = '';
    if (preSortBy === curSortBy) {
      sortOrder = (preSortOrder != 'asc') ? 'asc' : 'desc'
      sortOrderSign = (sortOrder === 'desc') ? '-' : '';
    } else {
      sortBy = curSortBy;
      sortOrder = 'asc';
    }
    this.transitionToParams({ sort: `${sortOrderSign}${sortBy}` });
    this.props.mutator.localRes.update({ sortBy: sortBy, sortOrder: sortOrder, listPreloaderStatus: true });
  }
  // Pages / Panels
  addNewVendor = () => {
    this.props.history.push(`/vendors/new`);
  }
  onCloseDetails = () => {
    this.props.history.push(`/vendors/`);
  }
}

export default withRouter(Main);