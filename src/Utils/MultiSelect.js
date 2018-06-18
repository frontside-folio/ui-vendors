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
    this.initializeNew = this.initializeNew.bind(this);
    this.initializeEdit = this.initializeEdit.bind(this);
  }

  componentDidMount() {
    const { name, isEditPage, initialValues } = this.props;
    if (isEditPage) {
      this.initializeEdit();
    } else {
      this.initializeNew();
    }
  }

  initializeNew() {
    const { name, dataState, dropdownCategories, updateMultiState } = this.props;
    const obj = Object.assign({ [name]: {
      selected: [],
      categories: dropdownCategories
    } }, dataState);
    updateMultiState(obj);
  }

  initializeEdit() {
    const { name, dataState, dropdownCategories, updateMultiState, initialValues } = this.props;
    const nameSp1 = name.split("[");
    const nameSp2 = nameSp1[1].split("]");
    const parentName = nameSp1[0];
    const index = Number(nameSp2[0]);
    const categories = initialValues[parentName][index].categories;
    // console.log(parentName);
    // console.log(index);
    // const nameSp2 = nameSp1.split("]");
    // console.log(nameSp2);
    // console.log(initialValues[]);
    // console.log(initialValues[newName]);
    // const obj = Object.assign({ [name]: {
    //   selected: [],
    //   categories: dropdownCategories
    // } }, dataState);
    // updateMultiState(obj);
    // console.log(name);
    // const baseCat = dropdownCategories;
    // const currCat = fields.getAll();
    // currCat.map(currItem => {
    //   const index = baseCat.indexOf(currItem);
    //   baseCat.splice(index, 1);
    //   console.log(baseCat);
    // });
    // console.log(baseCat);
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
