import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';

import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';

import LanguageList from "../Utils/Languages";
import CategoryContactInfo from "../Utils/CategoryContactInfo";

class CreateContactPeople extends Component {
  // static propTypes = {
  //   fields: PropTypes.object.isRequired,
  // };

  constructor(props) {
    super(props);
    this.state = {
      categoryOptions: CategoryContactInfo,
      selectLanguage: LanguageList
    }
    this.renderCreateContact = this.renderCreateContact.bind(this);
    this.renderSubCreateContact = this.renderSubCreateContact.bind(this);
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Contact" name="contact" id="contact" component={this.renderCreateContact} />
          <br />
        </Col>
      </Row>
    );
  }

  renderCreateContact = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          <span style={{ textAlign: 'right', display: 'block' }}>
            <Button onClick={() => fields.push({})}>+ Add Address</Button>
          </span>
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubCreateContact)}
        </Col>
      </Row>
    )
  }
  
  renderSubCreateContact = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={12} md={3}>
          <Field label="First/Last Name" name={`${elem}.first_last_name`} id={`${elem}.first_last_name`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Phone #" name={`${elem}.phonenum`} id={`${elem}.phonenum`} type="tel" component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Email Address" name={`${elem}.email_address`} id={`${elem}.email_address`} type="email" component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Category" name={`${elem}.category`} id={`${elem}.category`} component={Select} fullWidth dataOptions={this.state.categoryOptions} />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${elem}.default_language`} id={`${elem}.default_language`} component={Select} fullWidth dataOptions={this.state.selectLanguage} />
        </Col>
        <Col xs={12} md={7}>
          <Field label="Notes" name={`${elem}.notes`} id={`${elem}.notes`} component={TextArea} fullWidth />
        </Col>
        <Col xs={12} md={2}>
          <Button onClick={() => fields.remove(index)} buttonStyle="error" style={{ width: '100%', marginTop: '18px' }}>
            Remove
          </Button>
        </Col>
      </Row>
    );
  }
}

export default CreateContactPeople;