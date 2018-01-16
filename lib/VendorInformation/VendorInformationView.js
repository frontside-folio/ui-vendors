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
import Button from '@folio/stripes-components/lib/Button';

import LanguageList from "../Utils/Languages";
import css from "./VendorInformationView.css";

class VendorInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    onCloseDetails: PropTypes.func.isRequired,
    parentMutator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues !== null ? initialValues : false;
    if (dataVal) {
      return (
        <Row className={css.horizontalLine}>
          <Col xs={3}>
            <KeyValue label="ERP Code" value={_.get(dataVal, ['erp_code'], '')} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Payment Method" value={_.get(dataVal, ['payment_method'], '')} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Access Provider" value={_.toString(_.get(dataVal, ['access_provider']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Governmental" value={_.toString(_.get(dataVal, ['governmental']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Licensor" value={_.toString(_.get(dataVal, ['licensor']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Material Supplier" value={_.toString(_.get(dataVal, ['material_supplier']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="vendor_currencies" value={_.toString(_.map(dataVal.vendor_currencies))} />
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={3}>
            <KeyValue label="Claiming Interval" value={_.toString(_.get(dataVal, ['claiming_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Discount Percent" value={_.toString(_.get(dataVal, ['discount_percent']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Expected Activation Interval" value={_.toString(_.get(dataVal, ['expected_activation_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Expected Invoice Interval" value={_.toString(_.get(dataVal, ['expected_invoice_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Renewal Activation Interval" value={_.toString(_.get(dataVal, ['renewal_activation_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Subscription Interval" value={_.toString(_.get(dataVal, ['subscription_interval']))} />
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <h4 className={css.title}>Tax</h4>
          </Col>            
          <Col xs={3}>
            <KeyValue label="Tax ID" value={_.get(dataVal, ['tax_id'], '')} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Tax Percentage" value={_.toString(_.get(dataVal, ['tax_percentage']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Liable for VAT" value={_.toString(_.get(dataVal, ['liable_for_vat']))} />
          </Col>
        </Row>
      );
    } else {
      return (
        <div>
          <p>-- No agreements available --</p>
        </div>
      )
    }
  }

  // getInfo(val, key) {
  //   const rowCount = (this.props.initialValues.contacts.length - 1) !== key ? true : false;
  //   return (
  //     <Row key={key}>
  //       <Col xs={3}>
  //         <KeyValue label="Name" value={val.name} />
  //       </Col>
  //       <Col xs={3}>
  //         <KeyValue label="Discount" value={val.name} />
  //       </Col>
  //       <Col xs={3}>
  //         <KeyValue label="Reference URL" value={val.reference_url} />
  //       </Col>
  //       <Col xs={12}>
  //         <KeyValue label="Notes" value={val.notes} />
  //       </Col>
  //       {rowCount &&
  //         <div style={{ width: '100%' }}>
  //           <hr />
  //         </div>
  //       }
  //     </Row>
  //   )
  // }
}

export default VendorInformationView;