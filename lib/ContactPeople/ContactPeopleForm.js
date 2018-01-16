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
import { Required } from '../Utils/Validate';

class ContactPeopleForm extends Component {
  static propTypes = {
    dropdown: PropTypes.object.isRequired,
    dropdown_currencies: PropTypes.array.isRequired,
    dropdown_categories: PropTypes.array.isRequired,
    dropdown_contact_categories: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
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
            <Button onClick={() => fields.push({})}>+ Add</Button>
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
    const rowCount = (fields.length - 1) !== index ? true : false;
    return (
      <Row key={index}>
        <Col xs={12} md={3}>
          <Field label="Prefix" name={`${elem}.contact_person.prefix`} id={`${elem}.contact_person.perfix`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="First Name" name={`${elem}.contact_person.first_name`} id={`${elem}.contact_person.first_name`} validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Last Name" name={`${elem}.contact_person.last_name`} id={`${elem}.contact_person.last_name`} validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${elem}.contact_person.language`} id={`${elem}.contact_person.language`} component={Select} fullWidth dataOptions={this.state.selectLanguage} />
        </Col>
        <Col xs={12} md={12}>
          <Field label="Notes" name={`${elem}.contact_person.notes`} id={`${elem}.contact_person.notes`} component={TextArea} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Country Code" name={`${elem}.contact_person.phone_number.country_code`} id={`${elem}.contact_person.phone_number.country_code`} type="tel" component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Area Code" name={`${elem}.contact_person.phone_number.area_code`} id={`${elem}.contact_person.phone_number.area_code`} type="tel" component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Phone Number" name={`${elem}.contact_person.phone_number.phone_number`} id={`${elem}.contact_person.phone_number.phone_number`} type="tel" validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Email Address" name={`${elem}.contact_person.email.value`} id={`${elem}.contact_person.email.value`} type="email" validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Description" name={`${elem}.contact_person.email.description`} id={`${elem}.contact_person.email.description`} component={TextField} fullWidth />
        </Col>
        {/* Address */}
        <Col xs={12} md={3}>
          <Field label="Address 1" name={`${elem}.contact_person.address.addressLine1`} id={`${elem}.contact_person.address.addressLine1`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Address 2" name={`${elem}.contact_person.address.addressLine2`} id={`${elem}.contact_person.address.addressLine2`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="City" name={`${elem}.contact_person.address.city`} id={`${elem}.contact_person.address.city`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Region" name={`${elem}.contact_person.address.stateRegion`} id={`${elem}.contact_person.address.stateRegion`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Postal Code" name={`${elem}.contact_person.address.zipCode`} id={`${elem}.contact_person.address.zipCode`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Country" name={`${elem}.contact_person.address.country`} id={`${elem}.contact_person.address.country`} validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Category" name={`${elem}.categories`} id={`${elem}.categories`} component={Select} fullWidth style={{ height: '80px' }} dataOptions={this.props.dropdown_contact_categories} multiple />
        </Col>
        <Col xs={12} md={3}>
          <Field label="URL" name={`${elem}.contact_person.url.value`} id={`${elem}.url.value`} validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={6}>
          <Field label="URL Description" name={`${elem}.contact_person.url.description`} id={`${elem}.url.description`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Button onClick={() => fields.remove(index)} buttonStyle="error" style={{ width: '100%', marginTop: '18px' }}>
            Remove
          </Button>
        </Col>
        {rowCount &&
          <div style={{ width: '100%' }}>
            <br />
            <hr />
            <br />
          </div>
        }
      </Row>
    );
  }
}

export default ContactPeopleForm;