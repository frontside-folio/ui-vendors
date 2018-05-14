import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid';

import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from "@folio/stripes-components/lib/KeyValue";
import AddressView from '@folio/stripes-components/lib/structures/AddressFieldGroup/AddressView';
import css from "../ContactInformationView.css";

class ContactInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    dropdownCategories: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.getEmail = this.getEmail.bind(this);
  }

  render() {
    const { dataVal } = this.props;
    return (
      <Col xs={12} className={css.rowHeader}>
        <h4>Email Address</h4>
        {dataVal.map(this.getEmail)}
      </Col>
    );
  }

  getEmail(val, key) {
    const rowCount = (this.props.dataVal.length - 1) !== key ? true : false;
    const categories = val.categories && this.props.dropdownCategories ? this.props.parseCategories(val.categories, this.props.dropdownCategories) : null;
    const email = () => {
      var emailDescription = `${_.get(val, 'email.description', '')}`;
      if (emailDescription.trim().length >= 1) {
        return `${_.get(val, 'email.value', '')} - ${emailDescription}`;
      } else {
        return `${_.get(val, 'email.value', '')}`;
      }
    }

    return (
      <Row key={key}>
        <Col xs={5}>
          <KeyValue label="Email" value={email()} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Categories" value={categories} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Language" value={_.get(val, 'language', '')} />
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

export default ContactInformationView;