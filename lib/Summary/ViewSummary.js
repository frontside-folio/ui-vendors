import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field } from 'redux-form';

import Route from 'react-router-dom/Route';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Button from '@folio/stripes-components/lib/Button';


class ViewSummary extends React.Component {
  // static propTypes = {
  //   initialValues: PropTypes.object.isRequired,
  //   editButton: PropTypes.func.isRequired,
  // };

  constructor(props) {
    super(props);
  }

  render() {
    // const userVal = this.props.initialValues;
    return (
      <Row>
        <Col xs={12}>
          <Row>
          <Button onClick={this.props.editButton}>Edit</Button>
          <h2>Summary</h2>
          </Row>
        </Col>
        <Col xs={12}>
          <KeyValue label="Name" value={_.get(userVal, ['name'])} />
        </Col>
        <Col xs={12}>
          <MultiColumnList
            virtualize
            height={150}
            id={`list-${this.props.moduleName}`}
            contentData={_.get(userVal, ['vendor_names'])}
          />
        </Col>
        <Col xs={6}>
          <KeyValue label="Code" value={_.get(userVal, ['code'])} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Status" value={_.get(userVal, ['vendor_status'])} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Default Language" value={_.get(userVal, ['language'])} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Description" value={_.get(userVal, ['description'])} />
        </Col>
      </Row>
    );
  }
}

export default ViewSummary;