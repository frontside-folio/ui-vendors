import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';

import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';

import LanguageList from "../../Utils/Languages";
import CategoryContactInfo from "../../Utils/CategoryContactInfo";

class PhoneNumbers extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      categoryOptions: CategoryContactInfo,
      selectLanguage: LanguageList
    }

    this.renderSubPhoneNumbers = this.renderSubPhoneNumbers.bind(this);
  }

  render() {
    const { fields } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <span style={{ textAlign: 'right', display: 'block' }}>
            <Button onClick={() => fields.push({})}>+ Add Phone Number</Button>
          </span>
          <br />
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubPhoneNumbers)}
        </Col>
      </Row>
    )
  }
  
  renderSubPhoneNumbers = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={12} md={3}>
          <Field label="Country Code" name={`${elem}.phone_number.country_code`} id={`${elem}.phone_number.country_code`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Area Code" name={`${elem}.phone_number.area_code`} id={`${elem}.phone_number.area_code`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={6}>
          <Field label="Phone Number" name={`${elem}.phone_number.phone_number`} id={`${elem}.phone_number.phone_number`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={5}>
          <Field label="Categories" name={`${elem}.categories`} id={`${elem}.categories`} component={Select} fullWidth dataOptions={this.state.categoryOptions} multiple={true} />
        </Col>
        <Col xs={12} md={5}>
          <Field label="Default Language" name={`${elem}.default_language`} id={`${elem}.default_language`} component={Select} fullWidth dataOptions={this.state.selectLanguage} />
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

export default PhoneNumbers