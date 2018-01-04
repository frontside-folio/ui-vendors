import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';

import { Accordion } from '@folio/stripes-components/lib/Accordion';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';
import Checkbox from '@folio/stripes-components/lib/Checkbox';

class InterfaceForm extends Component {
  // static propTypes = {
  //   dropdown: PropTypes.shape({
  //     delivery_method_dd: PropTypes.array.isRequired,
  //     format_dd: PropTypes.array.isRequired
  //   })
  // }

  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Interface" name="interfaces" id="interfaces" component={this.renderForm} />
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
              <Field label="Name" name={`${elem}.name`} id={`${elem}.name`} component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="URL" name={`${elem}.uri`} id={`${elem}.uri`} type="url" component={TextArea} fullWidth />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label="Username" name={`${elem}.username`} id={`${elem}.username`} component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Password" name={`${elem}.password`} id={`${elem}.password`} type="password" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Notes" name={`${elem}.notes`} id={`${elem}.notes`} component={TextArea} fullWidth />
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Accordion label="Statistics" open={this.state.open}>
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={12}>
                    <Field label="Available" name={`${elem}.available`} id={`${elem}.available`} component={Checkbox}  />
                  </Col>
                  <Col xs={12}>
                    <Field label="Delivery Method" name={`${elem}.delivery_method`} id={`${elem}.delivery_method`} component={Select} fullWidth dataOptions={this.props.dropdown.delivery_method_dd} />
                  </Col>
                  <Col xs={12}>
                    <Field label="Format" name={`${elem}.format`} id={`${elem}.format`} component={Select} fullWidth dataOptions={this.props.dropdown.format_dd} />
                  </Col>
                  <Col xs={12}>
                    <Field label="Locally Stored" name={`${elem}.locally_stored`} id={`${elem}.locally_stored`} component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label="Online Location" name={`${elem}.online_location`} id={`${elem}.online_location`} component={TextField} fullWidth />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Accordion>
        </Col>
        <Col xs={12} md={2}>
          <Button onClick={() => fields.remove(index)} buttonStyle="error">
            Remove
          </Button>
        </Col>
      </Row>
    );
  }
}

export default InterfaceForm;