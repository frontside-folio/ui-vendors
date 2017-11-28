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
import TextField from '@folio/stripes-components/lib/TextField';
import stripesForm from '@folio/stripes-form';

class SummaryEdit extends React.Component {
  static propTypes = {
    vendorData: PropTypes.object.isRequired,
    viewButton: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <Button onClick={this.props.viewButton}>View</Button>
          <h2>Edit Summary</h2>
        </Col>
        <Col xs={3}>
          <Field label="Name" name="name" id="adduser_email" component={TextField} required fullWidth />
        </Col>
      </Row>
    )
  }

  

}


// export default SummaryEdit;

export default stripesForm({
  form: 'SummaryEdit',
  // validate,
  // asyncValidate,
  // asyncBlurFields: ['username'],
  // navigationCheck: true,
  // enableReinitialize: true,
})(SummaryEdit);