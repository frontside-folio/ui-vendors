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
import packageInfo from '../../package';
// Components and Pages
import PaneDetails from '../PaneDetails';
import { ViewVendor } from '../VendorViews';
import css from './Main.css';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;

const filterConfig = [
  {
    label: 'Vendor Status',
    name: 'vendor_status',
    cql: 'vendor_status',
    values: ['Active', 'Pending', 'Inactive']
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
    dropdown: {
      initialValue: {
        payment_method_dd: [
          {
            "label": "-- Select --",
            "value": ""
          },
          {
            "label": "EFT",
            "value": "eft"
          },
          {
            "label": "Bank Draft",
            "value": "bank_draft"
          },
          {
            "label": "Paper Check",
            "value": "paper_check"
          },
          {
            "label": "Credit Card/P-Card",
            "value": "credit_card_p_card"
          },
          {
            "label": "Deposit Account",
            "value": "deposit_account"
          },
          {
            "label": "Cash",
            "value": "cash"
          }
        ],
        vendor_edi_code_dd: [
          {
            "label": "-- Select --",
            "value": ""
          },
          { label: 'Code', value: 'code' },
        ],
        vendor_edi_code_type_dd: [
          { "label": "-- Select --", "value": "" },
          { label: '31B', value: '31b' },
          { label: '014', value: '014' },
          { label: '091', value: '091' },
          { label: '092', value: '092' },
        ],
        library_edi_code_dd: [
          { label: "-- Select --", value: "" },
          { label: 'Code', value: 'code' },
        ],
        library_edi_code_type_dd: [
          { label: "-- Select --", value: "" },
          { label: '31B', value: '31b' },
          { label: '014', value: '014' },
          { label: '091', value: '091' },
          { label: '092', value: '092' },
        ],
        ftp_dd: [
          { label: "-- Select --", value: "" },
          { label: 'SFTP', value: 'sftp' },
          { label: 'FTP', value: 'ftp' },
        ],
        transmission_mode_dd: [
          { label: "-- Select --", value: "" },
          { label: 'ASCII', value: 'ascii' },
          { label: 'Binary', value: 'binary' },
        ],
        connection_mode_dd: [
          { label: "-- Select --", value: "" },
          { label: 'Passive', value: 'passive' },
          { label: 'Active', value: 'active' },
        ],
        delivery_method_dd: [
          { label: "-- Select --", value: "" },
          { label: 'Online', value: 'online' },
          { label: 'FTP', value: 'ftp' },
          { label: 'Email', value: 'email' },
        ],
        format_dd: [
          { label: "-- Select --", value: "" },
          { label: 'Delimited', value: 'Delimited' },
          { label: 'Excel', value: 'excel' },
          { label: 'CSV', value: 'csv' },
          { label: 'PDF', value: 'pdf' },
          { label: 'ASCII', value: 'ascii' },
          { label: 'HTML', value: 'html' },
          { label: 'Other', value: 'other' },
        ],
        status_dd: [
          { label: "-- Select --", value: "" },
          { label: 'Active', value: 'Active' },
          { label: 'Inactive', value: 'Inactive' },
          { label: 'Pending', value: 'Pending' },
        ]
      }
    }
  });

  constructor(props) {
    super(props);
    const query = props.location.search ? queryString.parse(props.location.search) : {};
    this.state = {
      searchTerm: query.query || '',
      sortOrder: query.sort || '',
      filters: initialFilterState(filterConfig, query.filters),
    };
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
    return (
      <div style={{width: '100%'}} className={css.panepadding}>
        {
          getRecords &&
          <SearchAndSort
            packageInfo={packageInfo}
            objectName="vendors"
            baseRoute={packageInfo.stripes.route}
            filterConfig={filterConfig}
            visibleColumns={['Name', 'Code', 'Description', 'Vendor Status']}
            resultsFormatter={resultsFormatter}
            initialFilters={this.constructor.manifest.query.initialValue.filters}
            viewRecordComponent={ViewVendor}
            onSelectRow={onSelectRow}
            onCreate={this.create}
            editRecordComponent={PaneDetails}
            newRecordInitialValues={{}}
            initialResultCount={INITIAL_RESULT_COUNT}
            resultCountIncrement={RESULT_COUNT_INCREMENT}
            finishedResourceName="perms"
            viewRecordPerms="vendor.item.get"
            newRecordPerms="vendor.item.post,login.item.post,perms.vendor.item.post"
            parentResources={this.props.resources}
            parentMutator={this.props.mutator}
            detailProps={this.props.stripes}
            stripes={this.stripes}
            onComponentWillUnmount={onComponentWillUnmount}
          />
        }
      </div>
    )
  }
}

export default Main;