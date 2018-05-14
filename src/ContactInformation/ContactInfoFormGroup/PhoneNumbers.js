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
import css from '../ContactInfoFormGroup.css';
import { Required } from '../../Utils/Validate';

class PhoneNumbers extends Component {
  static propTypes = {
    dropdownCurrencies: PropTypes.array,
    dropdownCategories: PropTypes.array,
    dropdownContactCategories: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      selectLanguage: LanguageList
    }
    this.renderSubPhoneNumbers = this.renderSubPhoneNumbers.bind(this);
  }

  render() {
    const { fields } = this.props;
    return (
      <Row>
        {fields.length === 0 &&
          <Col xs={6}>
            <div><em>- Please add phone number -</em></div>
          </Col>
        }
        {fields.length !== 0 &&
          <Col xs={6}>
            <h6>Phone Number</h6>
          </Col>
        }
        <Col xs={12}>
          {fields.map(this.renderSubPhoneNumbers)}

        </Col>
        <Col xs={12} style={{ paddingTop: '10px'}}>
          <Button onClick={() => fields.push({})}>+ Add Phone Number</Button>
        </Col>
      </Row>
    )
  }
  
  renderSubPhoneNumbers = (elem, index, fields) => {
    return (
      <Row key={index} className={css.panels}>
        <Col xs={12} md={3}>
          <Field label="Country Code" name={`${elem}.phone_number.country_code`} id={`${elem}.phone_number.country_code`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Area Code" name={`${elem}.phone_number.area_code`} id={`${elem}.phone_number.area_code`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Phone Number" name={`${elem}.phone_number.phone_number`} id={`${elem}.phone_number.phone_number`} validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${elem}.language`} id={`${elem}.language`} component={Select} fullWidth dataOptions={this.state.selectLanguage} />
        </Col>
        <Col xs={12} md={3}>
     C   <Field label="Categories" name={`${elem}.categories`} id={`${elem}.categories`} component={Select} fullWidth dataOptions={this.props.dropdownCategories} style={{ height: '80px' }} multiple={true} />
        </Col>
        <Col xs={12} md={3} mdOffset={6} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger">
            Remove
          </Button>
        </Col>
      </Row>
    );
  }
}

export default PhoneNumbers;
