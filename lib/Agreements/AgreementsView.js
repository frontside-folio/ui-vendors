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
import css from "./AgreementsView.css";

class AgreementsView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentMutator: PropTypes.object.isRequired,
    ParentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired,
    })
  }

  constructor(props) {
    super(props);
    this.getAgreements = this.getAgreements.bind(this);
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues.agreements.length >= 1 ? initialValues.agreements : false;
    if (dataVal) {
      return (
        <div style={{ width: '100%' }} className={css.horizontalLine}>
          {dataVal.map(this.getAgreements)}
        </div>
      );
    } else {
      return (
        <div>
          <p>-- No agreements available --</p>
        </div>
      )
    }
  }

  getAgreements(val, key) {
    const rowCount = (this.props.initialValues.contacts.length - 1) !== key ? true : false;
    return (
      <Row key={key}>
        <Col xs={3}>
          <KeyValue label="Name" value={_.get(val, 'name')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Discount" value={_.get(val, 'name')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Reference URL" value={_.get(val, 'reference_url')} />
        </Col>
        <Col xs={12}>
          <KeyValue label="Notes" value={_.get(val, 'notes')} />
        </Col>
        {rowCount &&
          <div style={{ width: '100%' }}>
            <hr />
          </div>
        }
      </Row>
    )
  }
}

export default AgreementsView;