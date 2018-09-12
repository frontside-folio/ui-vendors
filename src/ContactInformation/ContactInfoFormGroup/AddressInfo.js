import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues } from 'redux-form';
import { MultiSelection, Row, Col, Button, TextField, Select } from '@folio/stripes-components';
import css from '../ContactInfoFormGroup.css';
import { Required } from '../../Utils/Validate';

class AddressInfo extends Component {
  static propTypes = {
    dropdownCategories: PropTypes.arrayOf(PropTypes.object),
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    dropdownCountry: PropTypes.arrayOf(PropTypes.object),
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      dispatch: PropTypes.func,
      change: PropTypes.func,
      store: PropTypes.func
    })
  };

  constructor(props) {
    super(props);
    this.renderSubAddress = this.renderSubAddress.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onRemoveSelect = this.onRemoveSelect.bind(this);
    this.selectedValues = this.selectedValues.bind(this);
  }

  onChangeSelect = (e, elem, fields) => {
    const { dispatch, change, stripes: { store } } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    console.log(formValues[`${elem}`]);
    dispatch(change(`${elem}.categories`, 'arvind'));
  }

  onRemoveSelect = () => {
  }

  selectedValues = (elem) => {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    console.info(formValues[elem]);
    return [{ label: 'test', value: 'quer' }];
  }

  renderSubAddress = (elem, index, fields) => {
    const { dropdownCategories, dropdownLanguages, dropdownCountry, stripes: { store } } = this.props;

    return (
      <Row key={index} className={css.panels}>
        <br />
        <Col xs={12} md={3}>
          <Field label="Address 1" name={`${elem}.address.addressLine1`} id={`${elem}.address.addressLine1`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Address 2" name={`${elem}.address.addressLine2`} id={`${elem}.address.addressLine2`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="City" name={`${elem}.address.city`} id={`${elem}.address.city`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Region" name={`${elem}.address.stateRegion`} id={`${elem}.address.stateRegion`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Postal Code" name={`${elem}.address.zipCode`} id={`${elem}.address.zipCode`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Country*" name={`${elem}.address.country`} id={`${elem}.address.country`} component={Select} dataOptions={dropdownCountry} validate={[Required]} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${elem}.language`} id={`${elem}.language`} component={Select} dataOptions={dropdownLanguages} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <MultiSelection label="Categories" name={`${elem}.categories`} dataOptions={dropdownCategories} onChange={(e) => this.onChangeSelect(e, elem, fields)} onRemove={this.onRemoveSelect} style={{ height: '80px' }} value={this.selectedValues(`${elem}.categories`)} />
        </Col>
        <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger">Remove</Button>
        </Col>
        <br />
      </Row>
    );
  }

  render() {
    const { fields } = this.props;
    return (
      <Row>
        <Col xs={6}>
          {fields.length === 0 &&
            <div><em>- Please add address info -</em></div>
          }
          {fields.length !== 0 &&
            <h6>Address Info</h6>
          }
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubAddress)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add Address</Button>
        </Col>
      </Row>
    );
  }
}

export default AddressInfo;
