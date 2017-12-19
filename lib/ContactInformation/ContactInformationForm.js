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
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';

import { AddressInfo, PhoneNumbers, EmailAddresses, Urls } from "./ContactInfoGroup";

class ContactInformationForm extends React.Component {
  static propTypes = {
    dropdown: PropTypes.array.isRequired,
    dropdown_currencies: PropTypes.array.isRequired,
    dropdown_categories: PropTypes.array.isRequired,
    dropdown_contact_categories: PropTypes.array.isRequired
  };

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Addess" name="addresses" id="addresses_address" component={AddressInfo} {...this.props} />
          <br />
        </Col>
        <Col xs={12}>
          <FieldArray label="Phone Numbers" name="phone_numbers" id="phone_numbers" component={PhoneNumbers} {...this.props} />
          <br />
        </Col>
        <Col xs={12}>
          <FieldArray label="Email Addresses" name="emails" id="emails" component={EmailAddresses} {...this.props} />
          <br />
        </Col>
        <Col xs={12}>
          <FieldArray label="urls" name="urls" id="urls" component={Urls} {...this.props} />
          <br />
        </Col>
      </Row>
    );
  }
 
}

export default ContactInformationForm;