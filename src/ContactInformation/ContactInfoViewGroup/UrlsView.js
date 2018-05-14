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
    this.getUrls = this.getUrls.bind(this);
  }

  getUrls(val, key) {
    const rowCount = this.props.dataVal.length - 1 !== key;
    const url = () => {
      const urlDescription = `${_.get(val, 'url.description', '')}`;
      if (urlDescription.trim().length >= 1) {
        return `${_.get(val, 'url.value', '')} - ${urlDescription}`;
      } else {
        return `${_.get(val, 'url.value', '')}`;
      }
    };

    return (
      <Row key={key}>
        <Col xs={5}>
          <KeyValue label="Url" value={url()} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Categories" value={this.props.dropdownCategories} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Language" value={_.get(val, 'language', '')} />
        </Col>
        <Col xs={12}>
          <KeyValue label="Notes" value={_.get(val, 'notes', '')} />
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
        <h4>Url(s)</h4>
        {dataVal.map(this.getUrls)}
      </Col>
    );
  }
}

export default ContactInformationView;
