import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';
import uuid from 'uuid';

import Route from 'react-router-dom/Route';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Button from '@folio/stripes-components/lib/Button';
import EditableList from '@folio/stripes-components/lib/structures/EditableList';
import AddressView from '@folio/stripes-components/lib/structures/AddressFieldGroup/AddressView';

import LanguageList from "../Utils/Languages";

class SummaryView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    dropdown: PropTypes.object.isRequired,
    dropdown_currencies: PropTypes.array.isRequired,
    dropdown_categories: PropTypes.array.isRequired,
    dropdown_contact_categories: PropTypes.array.isRequired,
    onCloseDetails: PropTypes.func.isRequired,
    parentMutator: PropTypes.object.isRequired,
    ParentResources: PropTypes.shape({
      vendorGETID: PropTypes.object,
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object
    })
  }

  constructor(props) {
    super(props);
    this.getAddress = this.getAddress.bind(this);
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues ? initialValues : [];
    
    return (
      <Row>
        <Col xs={12}>
          <KeyValue label="Name" value={_.get(dataVal, ['name'])} />
        </Col>
        <Col xs={12}>
          <h2>Address</h2>
          {dataVal.addresses.map(this.getAddress)}
        </Col>
      </Row>
    );
  }

  getAddress(val, key) {
    const rowCount = (this.props.initialValues.addresses.length-1) !== key ? true : false;
    console.log(rowCount);
    const labelMap = { addressLine1: 'Address Line 1', addressLine2: 'Address Line 2', stateRegion: 'State/Province/Region', zipCode: 'Zip/Postal Code' };
    const visibleFields = ['addressLine1', 'addressLine2', 'city', 'stateRegion', 'country', 'zipCode'];
    const headerFormatter = () => "";
  return(
      <div key={key}>
        <AddressView uiId={uuid()} key={uuid()} headerFormatter={headerFormatter} addressObject={val.address} />
        { rowCount &&
          <hr />
        }
      </div>
    );
  }
}

export default SummaryView;

