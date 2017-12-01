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
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';
import stripesForm from '@folio/stripes-form';
import EditableList from '@folio/stripes-components/lib/structures/EditableList';
import IfPermission from '@folio/stripes-components/lib/IfPermission';

import { Language_List } from "./Languages";

class SummaryEdit extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.renderSubFields = this.renderSubFields.bind(this);
  }

  render() {
    const { handleSubmit } = this.props;
    const statusOptions = [
      { label: 'Select Status', value: '' },
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'pending' },
      { label: 'Inactive', value: 'inactive' }
    ];
    const defaultLanguageOptions = Language_List;
    return (
      <div id="form-edit-summary">
        <Row>
          <Col xs={12}>
            <h4>Edit Summary</h4>
          </Col>
          <Col xs={12}>
            <Field label="Name" name="name" id="name" component={TextField} fullWidth />
          </Col>
          <Col xs={12}>
            <FieldArray label="Vendor Names" name="vendor_names" id="vendor_names" component={this.renderList} />
          </Col>
          <Col xs={12}>
            <Field label="Code" name="code" id='code' component={TextField} fullWidth />
          </Col>
          <Col xs={12}>
            <Field label="Status" name="status" id='status' component={Select} fullWidth dataOptions={statusOptions} />
          </Col>
          <Col xs={12}>
            <Field label="Default Language" name="default_language" id='default_language' component={Select} fullWidth dataOptions={defaultLanguageOptions} />
          </Col>
          <Col xs={12}>
            <Field label="Vendor Description" name="vendor_description" id='vendor_description' component={TextArea} rounded fullWidth />
        </Col>
        </Row>
      </div>
    );
  }
  renderList = ( fields ) => {
    
    return (
    <div>
      <span style={{textAlign: 'right', display: 'block'}}>
        {fields.push()}
        <Button onClick={() => fields.push({})}>Add Vendor</Button>
      </span>
      {fields.map(this.renderSubFields())}
    </div>
  );}

  renderSubFields = (elem, index, fields) => (
    <div key={index}>
      <Field label="id" name={`${elem}.id`} id={`${elem}.id`} component={TextField} fullWidth />
      <Field label="value" name={`${elem}.value`} id={`${elem}.description`} component={TextField} fullWidth />
      <Field label="description" name={`${elem}.description`} id={`${elem}.description`} component={TextField} fullWidth />
      <span style={{textAlign: 'right', display: 'block'}}>
        <Button onClick={() => fields.remove(index)} buttonStyle="error">
          Remove
        </Button>
      </span>
    </div>
  );

  // saveSet(data) {
  //   const newData = Object.assign({}, data, { id: "8e92edc5-d461-461c-93f7-f49859eeac8a"});
  //   console.log(newData);
  //   this.props.mutator.vendor.POST(data).then(() => {
  //     console.log("success");
  //   });
  // }
}

export default SummaryEdit;

