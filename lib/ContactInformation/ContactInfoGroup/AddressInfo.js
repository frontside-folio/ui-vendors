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

class AddressInfo extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      categoryOptions: CategoryContactInfo,
      selectLanguage: LanguageList
    }
    this.renderSubAddress = this.renderSubAddress.bind(this);
  }

  render() {
    const { fields } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <span style={{ textAlign: 'right', display: 'block' }}>
            <Button onClick={() => fields.push({})}>+ Add Address</Button>
          </span>
          <br />
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubAddress)}
        </Col>
      </Row>
    )
  }
  
  renderSubAddress = (elem, index, fields) => {
    return (
      <Row key={index}>
        <br />
        <Col xs={12} md={3}>
          <Field label="Address 1" name={`${elem}.address.address_line_1`} id={`${elem}.address.address_line_1`} component={TextField} fullWidth />
        </Col>
          <Col xs={12} md={3}>
          <Field label="Address 2" name={`${elem}.address.address_line_2`} id={`${elem}.address.address_line_2`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="City" name={`${elem}.address.city`} id={`${elem}.address.city`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Region" name={`${elem}.address.region`} id={`${elem}.address.region`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Postal Code" name={`${elem}.address.postal_code`} id={`${elem}.address.postal_code`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Coutry" name={`${elem}.address.country`} id={`${elem}.address.country`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Category" name={`${elem}.categories`} id={`${elem}.categories`} component={Select} fullWidth dataOptions={this.state.categoryOptions} multiple={true} />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${elem}.default_language`} id={`${elem}.default_language`} component={Select} fullWidth dataOptions={this.state.selectLanguage} />
        </Col>
        <Col xs={12} md={2}>
          <Button onClick={() => fields.remove(index)} buttonStyle="error" style={{ width: '100%', marginTop: '18px' }}>
            Remove
          </Button>
        </Col>
        <br />
      </Row>
    );
  }
}

export default AddressInfo;