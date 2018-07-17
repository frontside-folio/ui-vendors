import React, { Component, PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Col } from '@folio/stripes-components/lib/LayoutGrid';

class HandleErrors extends Component {
  static propTypes = {
    names: PropTypes.any.isRequired,
  }

  static getDerivedStateFromProps(props, state) {
    const { names, updateSectionErrors, data } = props;
    const isAllFalse = item => item === false;

    if (names && names.length > 0) {
      // Declase error arrays
      const summaryArr = [];
      const addressArr = [];
      // Loop
      Object.keys(names).map(key => {
        const indexName = names[key];
        const input = props[`${indexName}`].input;
        const meta = props[`${indexName}`].meta;
        // Summary Error
        if (input.name === 'name' || input.name === 'code') {
          summaryArr[key] = (meta.touched && meta.error) || false;
          return summaryArr;
        }
        // Contact Error
        if (input.name === 'addresses') {
          if ((meta.error) && meta.error.length > 0) {
            const addMetaErr = meta.error;
            Object.keys(addMetaErr).map(chkey => {
              addressArr[chkey] = addMetaErr[chkey] || false;
              return addressArr;
            });
          }
        }
      });
      // Check each array, if all contains false.
      data.summaryErr = !summaryArr.every(isAllFalse);
      data.contactInfoErr = !addressArr.every(isAllFalse);
    }
    if (data !== state) {
      updateSectionErrors(data);
      return { ...data };
    }
    console.warn('handle errors failed to update');
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
