import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import _ from "lodash";
import queryString from 'query-string';
// Folio
import Layer from '@folio/stripes-components/lib/Layer';
import makeQueryFunction from '@folio/stripes-components/util/makeQueryFunction';
import SearchAndSort from '@folio/stripes-smart-components/lib/SearchAndSort';
import { filters2cql, initialFilterState, onChangeFilter as commonChangeFilter } from '@folio/stripes-components/lib/FilterGroups';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import removeQueryParam from '@folio/stripes-components/util/removeQueryParam';
import packageInfo from '../../package';
// Components and Pages
import PaneDetails from '../PaneDetails';
import { VendorView } from '../VendorViews';
import css from './Main.css';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;

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
    query: {
      initialValue: {
        query: '',
        filters: '',
        sort: 'Name'
      },
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      clear: true,
      records: 'vendors',
      recordsRequired: '%{resultCount}',
      path: 'vendor',
      perRequest: RESULT_COUNT_INCREMENT,
      GET: {
        params: {
          query: (...args) => {
            /*
              This code is not DRY as it is copied from makeQueryFunction in stripes-components.
              This is necessary, as makeQueryFunction only referneces query paramaters as a data source.
              STRIPES-480 is intended to correct this and allow this query function to be replace with a call
              to makeQueryFunction.
              https://issues.folio.org/browse/STRIPES-480
            */
            const resourceData = args[2];
            const sortMap = {
              Name: 'name',
              Code: 'code'
            };

            let cql = `(name="${resourceData.query.query}*")`;
            const filterCql = filters2cql(filterConfig, resourceData.query.filters);
            if (filterCql) {
              if (cql) {
                cql = `(${cql}) and ${filterCql}`;
              } else {
                cql = filterCql;
              }
            }

            const { sort } = resourceData.query;
            if (sort) {
              const sortIndexes = sort.split(',').map((sort1) => {
                let reverse = false;
                if (sort1.startsWith('-')) {
                  // eslint-disable-next-line no-param-reassign
                  sort1 = sort1.substr(1);
                  reverse = true;
                }
                let sortIndex = sortMap[sort1] || sort1;
                if (reverse) {
                  sortIndex = `${sortIndex.replace(' ', '/sort.descending ')}/sort.descending`;
                }
                return sortIndex;
              });

              cql += ` sortby ${sortIndexes.join(' ')}`;
            }
            return cql;
          },
        },
        staticFallback: { params: {} },
      },
    },
  });

  constructor(props) {
    super(props);
    const query = props.location.search ? queryString.parse(props.location.search) : {};
    this.state = {
      searchTerm: query.query || '',
      sortOrder: query.sort || '',
      filters: initialFilterState(filterConfig, query.filters),
    };
    this.transitionToParams = transitionToParams.bind(this);
    this.removeQueryParam = removeQueryParam.bind(this);
  }

  create = (ledgerdata) => {
    const { mutator } = this.props;
    mutator.records.POST(ledgerdata).then(newLedger => {
      mutator.query.update({
        _path: `/vendors/view/${newLedger.id}`,
        layer: null
      });
    })
  }

  onNeedMore() {
    if (!_.isUndefined(this.props)) {
      if (!_.isNull(this.props.resources.resultCount)) {
        const props = this.props;
        var num = props.resources.localRes.resultCount + RESULT_COUNT_INCREMENT;
        props.mutator.localRes.update({ resultCount: num });
      }
    }
  }
  
  render() {
    const props = this.props;
    const { onSelectRow, disableRecordCreation, onComponentWillUnmount } = this.props;
    const initialPath = (_.get(packageInfo, ['stripes', 'home']));
    const resultsFormatter = {
      'Name': data => _.get(data, ['name'], ''),
      'Code': data => _.get(data, ['code'], ''),
      'Description': data => _.get(data, ['description'], ''),
      'Vendor Status': data => _.toString(_.get(data, ['vendor_status'], ''))
    }
    const getRecords = (this.props.resources || {}).records || [];
    const urlQuery = queryString.parse(this.props.location.search || '');
    console.log(getRecords);
    return (
      <div style={{width: '100%'}} className={css.panepadding}>
        <SearchAndSort
          moduleName={packageInfo.name.replace(/.*\//, '')}
          moduleTitle={'vendors'}
          objectName="vendors"
          baseRoute={packageInfo.stripes.route}
          filterConfig={filterConfig}
          visibleColumns={['Name', 'Code', 'Description', 'Vendor Status']}
          resultsFormatter={resultsFormatter}
          initialFilters={this.constructor.manifest.query.initialValue.filters}
          viewRecordComponent={VendorView}
          onSelectRow={onSelectRow}
          onCreate={this.create}
          editRecordComponent={PaneDetails}
          newRecordInitialValues={{}}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          finishedResourceName="perms"
          viewRecordPerms="vendor.item.get"
          newRecordPerms="vendor.item.post,login.item.post,perms.vendor.item.post"
          parentResources={props.resources}
          parentMutator={props.mutator}
          detailProps={this.props.stripes}
          onComponentWillUnmount={this.props.onComponentWillUnmount}
        />
      </div>
    )
  }
}

export default Main;