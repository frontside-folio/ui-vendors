import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';

import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

class Changelog extends Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Change Log" name="changelogs" id="changelogs" component={this.renderForm} />
          <br />
        </Col>
      </Row>
    );
  }

  renderForm = ({ fields }) => {
    return (
      <Row>
        {fields.map(this.renderSubForm)}
      </Row>
    )
  }
  
  renderSubForm = (elem, index, fields) => {
    const userVal = this.props.initialValues;
    return (
      <Row key={index}>
        <Col xs={12}>
          <KeyValue label="" value={_.get(dataVal, ['name'])} />
          <Field label="Name" name={`${elem}.name`} id={`${elem}.name`} component={TextField} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default Changelog;