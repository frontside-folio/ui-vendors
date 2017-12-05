import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field } from 'redux-form';

import Route from 'react-router-dom/Route';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Button from '@folio/stripes-components/lib/Button';
import stripesForm from '@folio/stripes-form';

import SummaryView from './SummaryView';
import SummaryEdit from './SummaryEdit';


class Summary extends React.Component {
  static propTypes = {
    resources: PropTypes.shape({
      vendor: PropTypes.shape({
        hasLoaded: PropTypes.bool.isRequired,
        records: PropTypes.arrayOf(
          PropTypes.shape({
            total_records: PropTypes.number.isRequired
          }),
        ),
      }),
    }),
    // react-route properties provided by withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      editStatus: true
    };
    this.editButton = this.editButton.bind(this);
    this.viewButton = this.viewButton.bind(this);
  }

  render() {
    console.log(this.props);
    let vendorData = this.props.resources.vendor.records[0].vendors[0];
    if(!this.state.editStatus) {
      return (
        <SummaryView initialValues={vendorData} editButton={this.editButton} {...this.props} />
      );
    } else {
      return (
        <SummaryEdit initialValues={vendorData} viewButton={this.viewButton} {...this.props} />
      );
    }
  }

  editButton() {
    this.setState({ editStatus: true });
  }
  viewButton() {
    this.setState({ editStatus: false });
  }
}

export default Summary;