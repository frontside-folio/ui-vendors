import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';

import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';
import {BrowserRouter} from 'react-router-dom';

class CreateAccounts extends Component {
  static propTypes = {
    dropdown: PropTypes.shape({
      payment_method_dd: PropTypes.array.isRequired,
      status_dd: PropTypes.array.isRequired
    })
  }

  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Accounts" name="accounts" id="accounts" component={this.renderForm} />
          <br />
        </Col>
      </Row>
    );
  }

  renderForm = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          <span style={{ textAlign: 'right', display: 'block' }}>
            <Button onClick={() => fields.push({})}>+ Add</Button>
          </span>
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubForm)}
        </Col>
        <br />
      </Row>
    )
  }
  
  renderSubForm = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label="name" name={`${elem}.name`} id={`${elem}.name`} component={TextArea} fullWidth /> 
            </Col>
            <Col xs={12}>
              <Field label="Vendor Account Number" name={`${elem}.account_no`} id={`${elem}.account_no`} component={TextArea} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Description" name={`${elem}.description`} id={`${elem}.description`} component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Acct. Payable Sys. No" name={`${elem}.app_system_no`} id={`${elem}.app_system_no`} component={TextField} fullWidth />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label="Payment Method" name={`${elem}.payment_method`} id={`${elem}.payment_method`} dataOptions={this.props.dropdown.payment_method_dd} component={Select} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Status" name={`${elem}.status`} id={`${elem}.status`} dataOptions={this.props.dropdown.status_dd} component={Select} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Contact Info" name={`${elem}.contact_info`} id={`${elem}.contact_info`} component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Library Code" name={`${elem}.library_code`} id={`${elem}.library_code`} component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Library EDI Code" name={`${elem}.library_edi_code`} id={`${elem}.library_edi_code`} component={TextField} fullWidth />
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Field label="notes" name={`${elem}.notes`} id={`${elem}.notes`} component={TextArea} fullWidth />
        </Col>
        <Col xs={12}>
          <Button onClick={() => fields.remove(index)} buttonStyle="error" style={{ width: '100%', marginTop: '18px' }}>
            Remove
          </Button>
        </Col>
      </Row>
    );
  }
}

export default CreateAccounts;