// import React, { Component } from 'react';
// import _ from 'lodash';
// import PropTypes from 'prop-types';

// export default const handleData = () => {
//     const { names, updateSectionErrors, data } = this.props;
//     if (!names && names.length <= 0) return false;
//     Object.keys(names).map(key => {
//       const indexName = names[key];
//       const input = this.props[`${indexName}`].input;
//       const meta = this.props[`${indexName}`].meta;
//       if (input.name === 'name' || input.name === 'code') {
//         data.summaryError = (meta.touched && meta.error) || false;
//       }

//       return data;
//     });
//     return updateSectionErrors(data);
//   }

import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Col } from '@folio/stripes-components/lib/LayoutGrid';

class HandleErrors extends Component {
  static propTypes = {
    names: PropTypes.Array,
    updateSectionErrors: PropTypes.func,
    data: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
  }

  handleData = () => {
    const { names, updateSectionErrors, data } = this.props;
    if (!names && names.length <= 0) return false;
    Object.keys(names).map(key => {
      const indexName = names[key];
      const input = this.props[`${indexName}`].input;
      const meta = this.props[`${indexName}`].meta;
      if (input.name === 'name' || input.name === 'code') {
        data.summaryError = (meta.touched && meta.error) || false;
      }

      return data;
    });
    return updateSectionErrors(data);
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
