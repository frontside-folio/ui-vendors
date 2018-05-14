import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import css from '../ContactInformationView.css';

class ContactInformationView extends React.Component {
  static propTypes = {
    dataVal: PropTypes.Object,
    dropdownCategories: PropTypes.Array
  };

  constructor(props) {
    super(props);
    this.getEmail = this.getEmail.bind(this);
  }

  getEmail(val, key) {
    const rowCount = (this.props.dataVal.length - 1) !== key;
    const email = () => {
      const emailDescription = `${_.get(val, 'email.description', '')}`;
      if (emailDescription.trim().length >= 1) {
        return `${_.get(val, 'email.value', '')} - ${emailDescription}`;
      } else {
        return `${_.get(val, 'email.value', '')}`;
      }
    };

    return (
      <Row key={key}>
        <Col xs={5}>
          <KeyValue label="Email" value={email()} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Categories" value={this.props.dropdownCategories} />
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
    );
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
}

export default ContactInformationView;
