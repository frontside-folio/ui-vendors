import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from '@folio/stripes-components/lib/LayoutGrid';

class HandleErrors extends Component {
  static propTypes = {
    names: PropTypes.any.isRequired,
  }

  static getDerivedStateFromProps(props, state) {
    const { names, updateSectionErrors, data } = props;
    if (names && names.length > 0) {
      Object.keys(names).map(key => {
        const indexName = names[key];
        const input = props[`${indexName}`].input;
        const meta = props[`${indexName}`].meta;

        if (input.name === 'name' || input.name === 'code') {
          data.summaryErr[key] = (meta.touched && meta.error) || false;
        }
        // if (input.name === 'address') {
        //   const nameAdd = input.name;
        //   console.log(input.name);
        //   data.summaryErr = (meta.touched && meta.error) || false;
        // }
      });
    }
    // Update parent state
    if (data !== state.data) {
      console.log(data);
      updateSectionErrors(data);
    }
    return false;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<Col xs={12} md={8}>Error handling enabled!</Col>);
  }
}

export default HandleErrors;
