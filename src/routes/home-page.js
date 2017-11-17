import React, { Component } from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import CheckBox from '@folio/stripes-components/lib/Checkbox';
import FilterPaneSearch from '@folio/stripes-components/lib/FilterPaneSearch';
import FilterGroups from '@folio/stripes-components/lib/FilterGroups/FilterGroups';
// Components
import PaneFilterSet from '../components/pane-filter-set'


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // filters: { uninitialized: true },
      // filters: initialFilterState(filterConfig, props.location.query.filters),
      filters: {
        'item.DVDs': true,
        'item.Microfilm': true,
        'location.Main Library': true
      },
      searchTerm: 'this is  string',
    };
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
    this.props.parentMutator.resultCount.replace(this.props.initialResultCount);
    this.commonChangeFilter(e);
  }
}