import React, { Component } from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import CheckBox from '@folio/stripes-components/lib/Checkbox';
import FilterPaneSearch from '@folio/stripes-components/lib/FilterPaneSearch';
import FilterGroups, { initialFilterState, onChangeFilter as commonChangeFilter } from '@folio/stripes-components/lib/FilterGroups/FilterGroups';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
// Components
import PaneFilterSet from '../components/pane-filter-set'


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: { uninitialized: true },
      // filters: initialFilterState(filterConfig, ),
      // filters: {
      //   'item.DVDs': true,
      //   'item.Microfilm': true,
      //   'location.Main Library': true
      // },
      searchTerm: 'this is  string',
    };

    // this.transitionToUrlReflectingFilters = transitionToUrlReflectingFilters.bind(this);
    this.commonChangeFilter = commonChangeFilter.bind(this);  
    this.transitionToParams = transitionToParams.bind(this);
  }
  
  render() {
    const searchHeader = (<FilterPaneSearch
      searchFieldId='input-user-search'
      onChange={this.onChangeSearch.bind(this)}
      onClear={this.onClearSearch.bind(this)}
      // resultsList={this.resultsList}
      value={this.state.searchTerm}
    />);

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

    return (
      <Paneset>
        <Pane paneTitle="Pane 2" defaultWidth="30%" header={searchHeader}>
          <FilterGroups
              config={filterConfig}
              filters={this.state.filters}
              onChangeFilter={this.onChangeFilter.bind(this)}
            />
        </Pane>
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
}