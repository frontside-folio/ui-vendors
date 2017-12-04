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

import Contact from "./ContactPeopleGroup";

class ContactPeopleGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="form-edit-contact-people">
        <hr />
        <Row>
          <Col xs={12}>
            <h4>Contact People</h4>
          </Col>
          <Col xs={12}>
            <FieldArray label="Contact" name="contact" id="contact" component={Contact} />
            <br />
          </Col>
        </Row>
      </div>
    );
  }
 
}

export default ContactPeopleGroup;