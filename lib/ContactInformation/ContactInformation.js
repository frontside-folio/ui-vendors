import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';

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
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';

class ContactInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryOptions: [
        { label: 'Returns', value: 'returns' },
        { label: 'Payments', value: 'payments' },
        { label: 'Customer Service', value: 'custom_service' },
        { label: 'Shipments', value: 'shipments' }
      ]
    }
    this.renderAddress = this.renderAddress.bind(this);
    this.renderSubAddress = this.renderSubAddress.bind(this);
    this.renderPhoneNumbers = this.renderPhoneNumbers.bind(this);
    this.renderSubPhoneNumbers = this.renderSubPhoneNumbers.bind(this);
  }
  // <Field label="Vendor Description" name="vendor_description" id='vendor_description' component={TextArea} fullWidth />
  // <Field label="Name" name="name" id="name" component={TextField} fullWidth />

  render() {
    return (
      <div id="form-edit-contact-information">
        <hr />
        <Row>
          <Col xs={12}>
            <h4>Contact Information</h4>
          </Col>
          <Col xs={12}>
            <FieldArray label="Addess" name="address" id="address" component={this.renderAddress} />
            <br />
          </Col>
          <Col xs={12}>
            <FieldArray label="Phone Numbers" name="phone_address" id="phone_address" component={this.renderPhoneNumbers} />
            <br />
          </Col>
        </Row>
      </div>
    );
  }
  renderAddress = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          <span style={{ textAlign: 'right', display: 'block' }}>
            <Button onClick={() => fields.push({})}>+ Add Address</Button>
          </span>
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubAddress)}
        </Col>
      </Row>
    )
  }
  renderSubAddress = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={12} md={3}>
          <Field label="Address" name={`${elem}.address`} id={`${elem}.name`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={2}>
          <Field label="Category" name="category" id='category' component={Select} fullWidth dataOptions={this.state.categoryOptions} />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Address" name={`${elem}.address`} id={`${elem}.address`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Country" name={`${elem}.country`} id={`${elem}.country`} component={TextField} fullWidth />
        </Col>
      </Row>
    );
  }
  renderPhoneNumbers = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          <span style={{ textAlign: 'right', display: 'block' }}>
            <Button onClick={() => fields.push({})}>+ Add Phone Number</Button>
          </span>
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubPhoneNumbers)}
        </Col>
      </Row>
    )
  }
  renderSubPhoneNumbers = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={12} md={3}>
          <Field label="Address" name={`${elem}.address`} id={`${elem}.name`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={2}>
          <Field label="Category" name="category" id='category' component={Select} fullWidth dataOptions={this.state.categoryOptions} />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Address" name={`${elem}.address`} id={`${elem}.address`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Country" name={`${elem}.country`} id={`${elem}.country`} component={TextField} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default ContactInformation;