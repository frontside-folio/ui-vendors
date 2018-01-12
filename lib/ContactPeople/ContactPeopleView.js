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
import Button from '@folio/stripes-components/lib/Button';

import LanguageList from "../Utils/Languages";

class ContactPeopleView extends React.Component {
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
    this.getContacts = this.getContacts.bind(this);
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues.contacts.length >= 1 ? initialValues.contacts : false;
    if (dataVal) {
      return (
        <div style={{ width: '100%' }}>
          {dataVal.map(this.getContacts)}
        </div>
      );
    } else {
      return (
        <div>
          <p>-- No contact available --</p>
        </div>
      )      
    }
  }

  getContacts(val, key) {
    const rowCount = (this.props.initialValues.contacts.length - 1) !== key ? true : false;
    var contact = val.contact_person;
    const full_name = `${contact.prefix} ${contact.first_name} ${contact.last_name}`;
    const phone_number = `${contact.phone_number.country_code} ${contact.phone_number.area_code} ${contact.phone_number.phone_number}`;
    const language = `${contact.language}`;
    const address = `${contact.address.addressLine1} ${contact.address.city} ${contact.address.stateRegion} ${contact.address.country}, ${contact.address.zipCode}`;
    const email = `${contact.email.value} - ${contact.email.description}` ;
    const url = `${contact.url.value} - ${contact.url.description}`;
    return (
      <Row key={key}>
        <Col xs={3}>
          <KeyValue label="Name" value={full_name} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Phone Number" value={phone_number} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Language" value={language} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Categories" value={_.get(val, ['categories'])} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Address" value={address} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Address 2" value={`${contact.address.addressLine2}`} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Email" value={email} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Url" value={url} />
        </Col>
        <Col xs={12}>
          <KeyValue label="Url" value={_.get(contact, ['notes'])} />
        </Col>
        
      </Row>
    )
  }
}

export default ContactPeopleView;