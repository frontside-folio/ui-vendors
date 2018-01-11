import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';
import uuid from 'uuid';

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
import AddressView from '@folio/stripes-components/lib/structures/AddressFieldGroup/AddressView';

import LanguageList from "../Utils/Languages";

class SummaryView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    dropdown: PropTypes.object.isRequired,
    dropdown_currencies: PropTypes.array.isRequired,
    dropdown_categories: PropTypes.array.isRequired,
    dropdown_contact_categories: PropTypes.array.isRequired,
    onCloseDetails: PropTypes.func.isRequired,
    parentMutator: PropTypes.object.isRequired,
    ParentResources: PropTypes.shape({
      vendorGETID: PropTypes.object,
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object
    })
  }

  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.initialValues);
    const { initialValues } = this.props;
    const dataVal = initialValues ? initialValues : [];
    const columnWidths = { 'value': '50%', 'description': '50%'};
    const columnMapping = {
      'value': 'name',
      'description': 'description'
    };

    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="Name" value={_.get(dataVal, ['name'])} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Code" value={_.get(dataVal, ['code'])} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Vendor Status" value={_.get(dataVal, ['vendor_status'])} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Default Language" value={_.get(dataVal, ['language'])} />
        </Col>
        <Col xs={12}>
          <KeyValue label="Description" value={_.get(dataVal, ['description'])} />
        </Col>
        <Col xs={12}>
          <h4>Vendor Names</h4>
          <MultiColumnList contentData={initialValues.aliases} columnWidths={columnWidths} columnMapping={columnMapping} />
        </Col>
 
      </Row>
    );
  }
}

export default SummaryView;