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

class ContactPeopleForm extends Component {
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
          <FieldArray label="Contacts" name="contacts" id="contacts" component={this.renderCreateContact} />
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
          <br />
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
          <Field label="Prefix" name={`${elem}.contact_person.prefix`} id={`${elem}.contact_person.perfix`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="First Name" name={`${elem}.contact_person.first_name`} id={`${elem}.contact_person.first_name`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Last Name" name={`${elem}.contact_person.last_name`} id={`${elem}.contact_person.last_name`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${elem}.contact_person.language`} id={`${elem}.contact_person.language`} component={Select} fullWidth dataOptions={this.state.selectLanguage} />
        </Col>
        <Col xs={12} md={12}>
          <Field label="Notes" name={`${elem}.contact_person.notes`} id={`${elem}.contact_person.notes`} component={TextArea} fullWidth />
        </Col>
        <Col xs={12} md={4}>
          <Field label="Country Code" name={`${elem}.contact_person.phone_number.country_code`} id={`${elem}.contact_person.phone_number.country_code`} type="tel" component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={4}>
          <Field label="Area Code" name={`${elem}.contact_person.phone_number.area_code`} id={`${elem}.contact_person.phone_number.area_code`} type="tel" component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={4}>
          <Field label="Phone Number" name={`${elem}.contact_person.phone_number.phone_number`} id={`${elem}.contact_person.phone_number.phone_number`} type="tel" component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Email Address" name={`${elem}.contact_person.email.value`} id={`${elem}.contact_person.email.value`} type="email" component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Description" name={`${elem}.contact_person.email.description`} id={`${elem}.contact_person.email.description`} component={TextField} fullWidth />
        </Col>
        {/* Address */}
        <Col xs={12} md={3}>
          <Field label="Address 1" name={`${elem}.contact_person.address.address_line_1`} id={`${elem}.contact_person.address.address_line_1`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Address 2" name={`${elem}.contact_person.address.address_line_2`} id={`${elem}.contact_person.address.address_line_2`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="City" name={`${elem}.contact_person.address.city`} id={`${elem}.contact_person.address.city`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Region" name={`${elem}.contact_person.address.region`} id={`${elem}.contact_person.address.region`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Postal Code" name={`${elem}.contact_person.address.postal_code`} id={`${elem}.contact_person.address.postal_code`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Coutry" name={`${elem}.contact_person.address.country`} id={`${elem}.contact_person.address.country`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="URL" name={`${elem}.value`} id={`${elem}.value`} component={TextField} fullWidth />
          <Field label="URL Description" name={`${elem}.description`} id={`${elem}.description`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Category" name={`${elem}.category`} id={`${elem}.category`} component={Select} fullWidth dataOptions={this.state.categoryOptions} />
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

export default ContactPeopleForm;