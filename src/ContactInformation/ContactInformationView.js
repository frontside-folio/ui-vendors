import React from 'react';
import PropTypes from 'prop-types';
import { Row } from '@folio/stripes-components/lib/LayoutGrid';
import { AddressInfoView, PhoneNumbersView, EmailView, UrlsView } from './ContactInfoViewGroup';
import { parseCategories } from '../Utils/Category';

class ContactInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired,
    })
  };

  render() {
    const { initialValues, parentResources } = this.props;
    const dataVal = initialValues || false;
    const dropdownCategories = (parentResources.dropdown || {}).dropdownCategories || [];
    return (
      <div style={{width: '100%'}}>
        <Row>
          {dataVal && 
            <div style={{ width: '100%' }}>
              <AddressInfoView dataVal={initialValues.addresses} parseCategories={parseCategories} dropdownCategories={dropdownCategories} />
              <PhoneNumbersView dataVal={initialValues.phone_numbers} parseCategories={parseCategories} dropdownCategories={dropdownCategories} />
              <EmailView dataVal={initialValues.emails} parseCategories={parseCategories} dropdownCategories={dropdownCategories} />
              <UrlsView dataVal={initialValues.urls} parseCategories={parseCategories} dropdownCategories={dropdownCategories} />
            </div>
          }
        </Row>
      </div>
    );
  }
}

export default ContactInformationView;
