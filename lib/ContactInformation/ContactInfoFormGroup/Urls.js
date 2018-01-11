import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';

import { Row, Col, Alignment } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';

import LanguageList from "../../Utils/Languages";
import css from '../ContactInfoFormGroup.css';

class Url extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectLanguage: LanguageList
    }

    this.renderSubUrl = this.renderSubUrl.bind(this);
  }

  render() {
    const { fields } = this.props;
    return (
      <Row>
        <Col xs={6}>
          {fields.length === 0 &&
            <div><em>- Please Add URL -</em></div>
          }
          {fields.length !== 0 &&
            <h4>URL(s)</h4>
          }
        </Col>
        <Col xs={6}>
          <span style={{ textAlign: 'right', display: 'block' }}>
            <Button onClick={() => fields.push({})}>+ Add URL</Button>
          </span>
          <br />
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubUrl)}
        </Col>
      </Row>
    )
  }

  renderSubUrl = (elem, index, fields) => {
    return (
      <Row key={index} className={css.panels}>
        <Col xs={12} md={3}>
          <Field label="URL" name={`${elem}.url.value`} id={`${elem}.url.value`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Description" name={`${elem}.url.description`} id={`${elem}.url.description`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={2}>
          <Field label="Categories" name={`${elem}.categories`} id={`${elem}.categories`} component={Select} fullWidth dataOptions={this.props.dropdown_categories} multiple />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${elem}.language`} id={`${elem}.language`} component={Select} fullWidth dataOptions={this.state.selectLanguage} />
        </Col>
        <Col xs={12}>
          <Field label="notes" name={`${elem}.notes`} id={`${elem}.notes`} component={TextArea} fullWidth />
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

export default Url