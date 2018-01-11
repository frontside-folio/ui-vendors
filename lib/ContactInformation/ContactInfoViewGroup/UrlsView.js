import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid';

import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import AddressView from '@folio/stripes-components/lib/structures/AddressFieldGroup/AddressView';
import css from "./ContactInformationView.css";

class ContactInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    dropdown_categories: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.getAddress = this.getAddress.bind(this);
    this.getPhoneNumbers = this.getPhoneNumbers.bind(this);
    this.parseCategories = this.parseCategories.bind(this);
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues ? initialValues : [];
    return (
      <Row>
        <Col xs={12} className={css.rowHeader}>
          <h4>Address</h4>
          {dataVal.addresses.map(this.getAddress)}
        </Col>
        <Col xs={12} className={css.rowHeader}>
          <h4>Phone Numbers</h4>
          {dataVal.phone_numbers.map(this.getPhoneNumbers)}
        </Col>
        
      </Row>
    );
  }


  getAddress(val, key) {
    const rowCount = (this.props.initialValues.addresses.length - 1) !== key ? true : false;
    const visibleFields = ['addressLine1', 'addressLine2', 'city', 'stateRegion', 'country', 'zipCode', 'categories', 'language'];
    const headerFormatter = () => null;
    // Parse Categories
    const categories = val.categories && this.props.dropdown_categories ? this.parseCategories(val.categories) : null;
    const addObj = _.assign({
      id: uuid(),
      language: val.language,
      categories: categories,
      san_code: val.san_code
      },
      val.address
    )

    return (
      <div key={key}>
        <AddressView uiId={uuid()} key={uuid()} headerFormatter={headerFormatter} addressObject={addObj} visibleFields={visibleFields} />
        { rowCount && <hr /> }
      </div>
    )
  }
  
  getPhoneNumbers(val, key) {
    const rowCount = (this.props.initialValues.phone_numbers.length - 1) !== key ? true : false;
    const visibleFields = ['country_code', 'area_code', 'phone_number', 'categories', 'language'];
    const headerFormatter = () => null;
    // Parse Categories
    const categories = val.categories && this.props.dropdown_categories ? this.parseCategories(val.categories) : null;
    const addObj = _.assign({
        id: uuid(),
        language: val.language,
        categories: categories,
      },
      val.phone_number
    )
    console.log(val);

    return (
      <div key={key}>
        <AddressView uiId={uuid()} key={uuid()} headerFormatter={headerFormatter} addressObject={addObj} visibleFields={visibleFields} />
        { rowCount && <hr /> }
      </div>
    )
  }

  parseCategories(val) {
    var arr = [];
    var dropdownCategories = this.props.dropdown_categories;
    val.forEach(function (val1, key1) {
      dropdownCategories.forEach(function(val2, key2){
        if (val1 === val2.value) {
          arr.push(val2.label);
        }
      });
    });
    return arr.join(', ');
  }
}

export default ContactInformationView;