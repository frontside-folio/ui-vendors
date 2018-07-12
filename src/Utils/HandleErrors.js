import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Col } from '@folio/stripes-components/lib/LayoutGrid';

class HandleErrors extends Component {
  // static propTypes = {
  //   names: PropTypes.Array
  // }

  render() {
    // const { names } = this.props;
    const list = [];
    // const list = Object.keys(names).map(key => {
    //   if (names) {
    //     const indexName = names[key];
    //     const input = this.props[indexName].input;
    //     const meta = this.props[indexName].meta;
    //     return meta.touched && meta.error ? <div key={key} style={{ border: '1px solid red', padding: '5px', color: '#461717', background: '#ff000012', marginBottom: '1px' }}>{input.name} is required</div> : undefined;
    //   }
    // });

    if (!this.props) {
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
