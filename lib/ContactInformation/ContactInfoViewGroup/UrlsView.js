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
    dropdown_categories: PropTypes.array,
    parseCategories: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.getUrls = this.getUrls.bind(this);
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

  getUrls(val, key) {
    const rowCount = (this.props.dataVal.length - 1) !== key ? true : false;
    // Parse Categories
    const categories = val.categories && this.props.dropdown_categories ? this.props.parseCategories(val.categories, this.props.dropdown_categories) : null;
    const url = () => {
      if (val.url.description.trim().length >= 1) {
        return `${val.url.value} - ${val.url.description}`;
      } else {
        return `${val.url.value}`;
      }
    }
    
    return (
      <Row key={key}>
        <Col xs={5}>
          <KeyValue label="Url" value={url()} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Categories" value={categories} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Language" value={val.language} />
        </Col>
        <Col xs={12}>
          <KeyValue label="Notes" value={val.notes} />
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