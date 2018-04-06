import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid';

import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { AddressInfoView, PhoneNumbersView, EmailView, UrlsView } from "./ContactInfoViewGroup";

import { parseCategories } from "../Utils/Category";

class ContactInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentMutator: PropTypes.object.isRequired,
    parentResources: PropTypes.shape({
      vendorGETID: PropTypes.object,
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired,
    })
  };
 
  constructor(props) {
    super(props);
  }

  render() {
    const { initialValues, parentResources } = this.props;
    const dataVal = initialValues ? true : false;
    const dropdown_categories = (parentResources.dropdown || {}).dropdown_categories || [];
    return (
      <div style={{width: '100%'}}>
        <Row>
          {dataVal && 
            <div style={{ width: '100%' }}>
              <AddressInfoView dataVal={initialValues.addresses} parseCategories={parseCategories} dropdown_categories={dropdown_categories} />
              <PhoneNumbersView dataVal={initialValues.phone_numbers} parseCategories={parseCategories} dropdown_categories={dropdown_categories} />
              <EmailView dataVal={initialValues.emails} parseCategories={parseCategories} dropdown_categories={dropdown_categories} />
              <UrlsView dataVal={initialValues.urls} parseCategories={parseCategories} dropdown_categories={dropdown_categories} />
            </div>
          }
        </Row>
      </div>
    );
  }
}

export default ContactInformationView;