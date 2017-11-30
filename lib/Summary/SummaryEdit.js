import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';

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
import EditableList from '@folio/stripes-components/lib/structures/EditableList';
import IfPermission from '@folio/stripes-components/lib/IfPermission';

class SummaryEdit extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    viewButton: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.renderSubFields = this.renderSubFields.bind(this);
    this.saveSet = this.saveSet.bind(this);

    console.log(props);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form id="form-view-summary" onSubmit={handleSubmit(this.saveSet)}>
        <Row>
          <Col xs={12}>
            <Button onClick={this.props.viewButton}>View</Button>
            <h2>Edit Summary</h2>
          </Col>
          <Col xs={6}>
            <Field label="name" name="name" id="name" component={TextField} fullWidth />
          </Col>
          <Col xs={6}>
            <FieldArray name="vendor_names" component={this.renderList} />
            <button type="submit" >Submit</button>
          </Col>
        </Row>
      </form>
    )
  }

  renderList = ({ fields }) => (
    <ul>
      <Button onClick={() => fields.push({})}>Add Member</Button>
      {fields.map(this.renderSubFields)}
    </ul>
  )

  renderSubFields = (elem, index, fields) => (
    <li key={index}>
      <Button onClick={() => fields.remove(index)}>Remove</Button>
      <Field label="id" name={`${elem}.id`} id={`${elem}.id`} component={TextField} fullWidth />
      <Field label="value" name={`${elem}.value`} id={`${elem}.description`} component={TextField} fullWidth />
      <Field label="description" name={`${elem}.description`} id={`${elem}.description`} component={TextField} fullWidth />
    </li>
  )

  saveSet(data) {
    const newData = Object.assign({}, data, { id: "8e92edc5-d461-461c-93f7-f49859eeac8a"});
    console.log(newData);
    this.props.mutator.vendor.POST(data).then(() => {
      console.log("success");
    });
  }
}

// export default SummaryEdit;
export default stripesForm({
  form: 'SummaryEdit',
  // validate,
  // asyncValidate,
  // asyncBlurFields: ['username'],
  allowRemoteSave: true,  
  navigationCheck: true,
  enableReinitialize: true,
})(SummaryEdit);
