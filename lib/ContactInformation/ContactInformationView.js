import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid';

import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { AddressInfoView, PhoneNumbersView, EmailView, UrlsView } from "./ContactInfoViewGroup";

class ContactInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    dropdown_categories: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.parseCategories = this.parseCategories.bind(this);
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues ? true : false;
    return (
      <div style={{width: '100%'}}>
        <Row>
          {dataVal && 
            <div style={{ width: '100%' }}>
              <AddressInfoView dataVal={initialValues.addresses} parseCategories={this.parseCategories} />
              <PhoneNumbersView dataVal={initialValues.phone_numbers} parseCategories={this.parseCategories} />
              <EmailView dataVal={initialValues.emails} parseCategories={this.parseCategories} />
              <UrlsView dataVal={initialValues.urls} parseCategories={this.parseCategories} />
            </div>
          }
        </Row>
      </div>
    );
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