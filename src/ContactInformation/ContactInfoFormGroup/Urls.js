import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import Select from '@folio/stripes-components/lib/Select';
import css from '../ContactInfoFormGroup.css';
import { Required } from '../../Utils/Validate';

class Url extends Component {
  static propTypes = {
    dropdownCategories: PropTypes.arrayOf(PropTypes.object),
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    fields: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderSubUrl = this.renderSubUrl.bind(this);
  }

  renderSubUrl = (elem, index, fields) => {
    return (
      <Row key={index} className={css.panels}>
        <Col xs={12} md={3}>
          <Field label="URL" name={`${elem}.url.value`} id={`${elem}.url.value`} validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Description" name={`${elem}.url.description`} id={`${elem}.url.description`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Categories" name={`${elem}.categories`} id={`${elem}.categories`} component={Select} fullWidth dataOptions={this.props.dropdownCategories} multiple />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${elem}.language`} id={`${elem}.language`} component={Select} fullWidth dataOptions={this.props.dropdownLanguages} />
        </Col>
        <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger">
            Remove
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    const { fields } = this.props;
    return (
      <Row>
        <Col xs={6}>
          {fields.length === 0 &&
            <div><em>- Please add URL -</em></div>
          }
          {fields.length !== 0 &&
            <h6>URL(s)</h6>
          }
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubUrl)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add URL</Button>
        </Col>
      </Row>
    );
  }
}

export default Url;
