import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from '@folio/stripes-components/lib/LayoutGrid';

class HandleErrors extends Component {
  static propTypes = {
    names: PropTypes.Array
  }

  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
  }

  handleData = () => {
    const { names } = this.props;
    if (!names && names.length <= 0) return false;
    const list = Object.keys(names).map(key => {
      const indexName = names[key];
      const input = this.props[`${indexName}`].input;
      const meta = this.props[`${indexName}`].meta;
      return meta.touched && meta.error ? <div key={key} style={{ border: '1px solid red', padding: '5px', color: '#461717', background: '#ff000012', marginBottom: '1px' }}>{input.name} is required</div> : undefined;
    });
    return list;
  }

  render() {
    const list = this.handleData() || null;

    if (!list) {
      return (
        <Col xs={12} md={8}>list not available</Col>
      );
    }

    return (
      <Col xs={12} md={8}>{list}</Col>
    );
  }
}

export default HandleErrors;
