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

import { CreateAddressInfo, CreatePhoneNumbers, CreateEmailAddresses, CreateUrl } from "./CreateContactInfoGroup";

class CreateContactInformation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Addess" name="address" id="address" component={CreateAddressInfo} />
          <br />
        </Col>
        <Col xs={12}>
          <FieldArray label="Phone Numbers" name="phone_numbers" id="phone_numbers" component={CreatePhoneNumbers} />
          <br />
        </Col>
        <Col xs={12}>
          <FieldArray label="Email Addresses" name="email_addresses" id="email_addresses" component={CreateEmailAddresses} />
          <br />
        </Col>
        <Col xs={12}>
          <FieldArray label="url" name="url" id="url" component={CreateUrl} />
          <br />
        </Col>
      </Row>
    );
  }
 
}

export default CreateContactInformation;