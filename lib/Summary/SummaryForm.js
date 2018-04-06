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
import { Required } from '../Utils/Validate';
import css from './SummaryView.css';

class SummaryForm extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.renderSubFields = this.renderSubFields.bind(this);
  }

  render() {
    const statusOptions = [
      { label: 'Select Status', value: '' },
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' }
    ];
    const defaultLanguageOptions = LanguageList;

    return (
        <Row>
          <Col xs={12}>
          <Field label="Name" name="name" id="name" validate={[Required]} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label="Code" name="code" id='code' component={TextField} fullWidth />
            <Field label="Status" name="vendor_status" id='vendor_status' component={Select} fullWidth dataOptions={statusOptions} />
            <Field label="Default Language" name="language" id='language' component={Select} fullWidth dataOptions={defaultLanguageOptions} />
          </Col>
          <Col xs={12} md={6}>
          <Field label="Vendor Description" name="description" id='description' component={TextArea} style={{ width: '100%', height: '139px' }} />
          </Col>
          <Col xs={12}>
            <FieldArray label="Vendor Names" name="aliases" id="aliases" component={this.renderList} />
            <br />
          </Col>
      </Row>
    );
  }
  renderList = ({ fields }) => {
    return (
      <Row>
        <Col xs={6}>
          <h6>Vendor Names</h6>
        </Col>
        <Col xs={12}>
          {fields.length === 0 &&
            <div><em>- Please add vendors -</em></div>
          }
          {fields.map(this.renderSubFields)}
        </Col>
        <Col xs={12}  style={{ paddingTop: '10px'}}>
          <Button onClick={() => fields.push({})}>+ Add</Button>
        </Col>
      </Row>
    )
  }

  renderSubFields = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={5}>
          <Field label="AKA" name={`${elem}.value`} id={`${elem}.value`} validate={[Required]} component={TextField} fullWidth />
        </Col> 
        <Col xs={5}>
          <Field label="description" name={`${elem}.description`} id={`${elem}.description`} component={TextField} fullWidth />
        </Col>
        <Col xs={2}>
            <Button onClick={() => fields.remove(index)} buttonStyle="danger" style={{width: '100%', marginTop: '23px'}}>
              Remove
            </Button>
        </Col>
      </Row>
    );
  }
}

export default SummaryForm;

