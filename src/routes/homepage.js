import React, { Component } from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import CheckBox from '@folio/stripes-components/lib/Checkbox';
import FilterPaneSearch from '@folio/stripes-components/lib/FilterPaneSearch';
import FilterGroups, { initialFilterState, onChangeFilter as commonChangeFilter } from '@folio/stripes-components/lib/FilterGroups/FilterGroups';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
// Components and Pages
import PaneFilterSet from '../components/pane-filter-set';
import vendorDetailsPane from './vendor-details-pane';

export default class Home extends Component {
  constructor(props, context) {
    super(props, context);
    console.log(context);
    this.state = {
      filters: { uninitialized: true },
      // filters: initialFilterState(filterConfig, ),
      // filters: {
      //   'item.DVDs': true,
      //   'item.Microfilm': true,
      //   'location.Main Library': true
      // },
      searchTerm: 'this is  string',
      selectedRow: {},
    };

    // In Filters
    // this.transitionToUrlReflectingFilters = transitionToUrlReflectingFilters.bind(this);
    this.commonChangeFilter = commonChangeFilter.bind(this);  
    this.transitionToParams = transitionToParams.bind(this);
    // In Listings
  }
  
  render() {
    const searchHeader = (<FilterPaneSearch
      searchFieldId='input-user-search'
      onChange={this.onChangeSearch.bind(this)}
      onClear={this.onClearSearch.bind(this)}
      // resultsList={this.resultsList}
      value={this.state.searchTerm}
    />);
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
        title: 'Biology Today',
        id: '199930490002',
        author: {
          firstName: 'James',
          lastName: 'Whitcomb',
        },
      },
      {
        title: 'Financial Matters',
        id: '199930490034',
        author: {
          firstName: 'Philip',
          lastName: 'Marston',
        },
      },
      {
        title: 'Modern Microbiotics',
        id: '199930490064',
        author: {
          firstName: 'Eric',
          lastName: 'Martin',
        },
      },
    ]
    const resultsFormatter = {
      author: item => `${item.author.firstName} ${item.author.lastName}`,
    };

    // const vendorDetailsPane = (
    //   <Route
    //     path={`${this.props.match.path}/view/:id`}
    //     render={props => <vendorDetails
    //       paneWidth="44%"
    //       {...props}
    //   />}
    // />);

    return (
      <Paneset>
        <Pane paneTitle="Filters" defaultWidth="20%" header={searchHeader}>
          <FilterGroups
              config={filterConfig}
              filters={this.state.filters}
              onChangeFilter={this.onChangeFilter.bind(this)}
            />
        </Pane>
        <Pane paneTitle="Data listing" defaultWidth="80%">
          <MultiColumnList
            autosize
            virtualize
            id={`list-${this.props.moduleName}`}
            contentData={catalogResults}
            selectedRow={this.state.selectedRow}
            formatter={resultsFormatter}
            onRowClick={this.onSelectRow}
            // onHeaderClick={this.onSort}
            // onNeedMoreData={this.onNeedMore}
            // visibleColumns={this.props.visibleColumns}
            sortedColumn="author"
            sortOrder="descending"
            sortDirection="descending"
            // isEmptyMessage={`No results found${maybeTerm}. Please check your ${maybeSpelling}filters.`}
            // columnMapping={this.props.columnMapping}
            // loading={resource ? resource.isPending : false}
            
            // ariaLabel={`${objectNameUC} search results`}
            // rowFormatter={this.anchoredRowFormatter}
            // containerRef={(ref) => { this.resultsList = ref; }}
          />
        </Pane>
        <vendorDetailsPane />
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
    this.setState({ selectedRow: getRowId });
  }
}