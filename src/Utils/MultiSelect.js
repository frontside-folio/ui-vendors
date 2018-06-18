import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import Button from '@folio/stripes-components/lib/Button';

class MultiSelect extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    dataOptions: PropTypes.arrayOf(PropTypes.object),
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
    this.updateState = this.updateState.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.initialized = this.initialized.bind(this);
    this.initNew = this.initNew.bind(this);
    this.initEdit = this.initEdit.bind(this);
  }

  componentDidMount() {
    const { name, isEditPage, initialValues } = this.props;
    this.initialized();
  }

  initialized() {
    const { isEditPage } = this.props;
    if (isEditPage) {
      this.initEdit();
    } else {
      this.initNew();
    }
  }

  initNew() {
    const { name, dataState, dropdownCategories, updateMultiState } = this.props;
    const obj = Object.assign({ [name]: {
      selected: [],
      categories: dropdownCategories
    } }, dataState);
    updateMultiState(obj);
  }

  initEdit() {
    const { name, dataState, dropdownCategories, updateMultiState, initialValues } = this.props;
    // Parse name to be able to get inside intialValues
    const nameSp1 = name.split('[');
    const nameSp2 = nameSp1[1].split(']');
    const parentName = nameSp1[0];
    const index = Number(nameSp2[0]);
    const parentPath = initialValues[parentName][index];
    if (!parentPath) {
      // Check if categories doesn't exist, create new;
      this.initNew();
    } else {
      // Filter currect categories
      const categories = parentPath.categories;
      const baseCat = dropdownCategories;
      const newCategories = baseCat.filter(item => !categories.includes(item));
      // Update state
      const obj = Object.assign({ [name]: {
        selected: [],
        categories: newCategories
      } }, dataState);
      updateMultiState(obj);
    }
  }

  updateState = (item, fields, i) => {
    const { name, dataState, dropdownCategories, updateMultiState } = this.props;
    fields.push(`${item}`); // Push item
    // Remove item in caterogies
    const categories = dataState[name].categories;
    const newCategories = categories.filter(cat => cat !== item);
    // Update Props State
    const obj = Object.assign({}, dataState);
    obj[name].categories = newCategories;
    updateMultiState(obj);
  }

  onRemove = (data, fields, i) => {
    fields.remove(i);
  }

  renderForm = ({ fields }) => {
    const { name, dataState} = this.props;
    const isData = dataState[name] || false;
    return (
      <div>
        {fields.map(this.renderSubForm)}
        {
          isData &&
          dataState[name].categories.map((item, i) => {
            return (
              <Button key={i} onClick={() => this.updateState(item, fields, i)}>{item}</Button>
            );
          })
        }
      </div>
    );
  }

  renderSubForm = (elem, i, fields) => {
    const data = `${fields.get(i)}`;

    return (
      <div key={i}>
        <Field label={`${fields.get(i)}`} name={`${fields.get(i)}`} id={`${fields.get(i)}`} value={`${fields.get(i)}`} checked="checked" component={Checkbox} />
        <button type="button" title="Remove" onClick={() => this.onRemove(data, fields, i)}>X</button>
      </div>
    );
  }

  render() {
    const { id, name, label, dataState } = this.props;
    return (
      <FieldArray label={label} name={name} id={id} component={this.renderForm} />
    );
  }
}


export default MultiSelect;
