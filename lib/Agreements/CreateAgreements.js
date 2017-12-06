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

class CreateAgreements extends Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <h4>Agreement(s)</h4>
        </Col>
        <Col xs={12}>
          <FieldArray label="Create Agreements" name="create_agreements" id="create_agreements" component={this.renderForm} />
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
            <Button onClick={() => fields.push({})}>+ Add Agreement</Button>
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
        <Col xs={12} md={4}>
          <Field label="Name" name={`${elem}.name`} id={`${elem}.name`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={4}>
          <Field label="Discount %" name={`${elem}.discount`} id={`${elem}.discount`} type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={4}>
          <Field label="URL" name={`${elem}.url`} id={`${elem}.url`} type="text" component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={10}>
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

export default CreateAgreements;