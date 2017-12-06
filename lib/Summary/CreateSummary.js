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

import LanguageList from "../Utils/Languages";

class CreateSummary extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.renderSubFields = this.renderSubFields.bind(this);
  }

  // componentDidMount() {
  //   const values = [{}];
  //   this.props.initialize({ vendor_names: values });
  // }

  render() {
    const statusOptions = [
      { label: 'Select Status', value: '' },
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'pending' },
      { label: 'Inactive', value: 'inactive' }
    ];
    
    const defaultLanguageOptions = LanguageList;
    return (
        <Row>
          <Col xs={12}>
            <Field label="Name" name="name" id="name" component={TextField} fullWidth />
          </Col>
          <Col xs={12}>
            <br />
            <FieldArray label="Vendor Names" name="vendor_names" id="vendor_names" component={this.renderList} />
            <br />
          </Col>
          <Col xs={12} md={6}>
            <Field label="Code" name="code" id='code' component={TextField} fullWidth />
            <Field label="Status" name="status" id='status' component={Select} fullWidth dataOptions={statusOptions} />
            <Field label="Default Language" name="default_language" id='default_language' component={Select} fullWidth dataOptions={defaultLanguageOptions} />
          </Col>
          <Col xs={12} md={6}>
            <Field label="Vendor Description" name="vendor_description" id='vendor_description' component={TextArea} fullWidth />
        </Col>
      </Row>
    );
  }
  renderList = ({ fields }) => {
    return (
      <Row>
        <Col xs={6}>
          <h5>Vendor Names</h5>
        </Col>
        <Col xs={6}>
          <span  style={{textAlign: 'right', display: 'block'}}>
            <Button onClick={() => fields.push({})}>+ Add Members</Button>
          </span>
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubFields)}
        </Col>
      </Row>
    )
  }

  renderSubFields = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={5}>
          <Field label="name" name={`${elem}.name`} id={`${elem}.name`} component={TextField} fullWidth />
        </Col>
        <Col xs={5}>
          <Field label="description" name={`${elem}.description`} id={`${elem}.description`} component={TextField} fullWidth />
        </Col>
        <Col xs={2}>
            <Button onClick={() => fields.remove(index)} buttonStyle="error" style={{width: '100%', marginTop: '18px'}}>
              Remove
            </Button>
        </Col>
      </Row>
    );
  }
}

export default CreateSummary;

