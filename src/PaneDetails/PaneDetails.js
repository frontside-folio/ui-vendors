import React from 'react';
import Route from 'react-router-dom/Route';
import PropTypes from 'prop-types';
// @Folio
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Button from '@folio/stripes-components/lib/Button';
import Icon from '@folio/stripes-components/lib/Icon';
import stripesForm from '@folio/stripes-form';
import { ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import TextField from '@folio/stripes-components/lib/TextField';
// Local Components
import { FormVendor } from '../VendorViews';
// Utils
import Convert from '../Utils/Convert';

class PaneDetails extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onRemove: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    parentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired
    }),
    parentMutator: PropTypes.object
  }
  
  constructor(props) {
    super(props);
    this.state = {
      paramID: []
    }
    this.deleteVendor = this.deleteVendor.bind(this);
    // Get Data and Categories
    // this.initVal = this.initVal.bind(this);
    this.getContactCategory = this.getContactCategory.bind(this);
    this.getContactCategory = this.getContactCategory.bind(this);
  }
  getAddFirstMenu() {
    const { onCancel } = this.props;
    return (
      <PaneMenu>
        <button id="clickable-closenewvendordialog" onClick={onCancel} title="close" aria-label="Close New Vendor Dialog">
          <span style={{ fontSize: '30px', color: '#999', lineHeight: '18px' }} >&times;</span>
        </button>
      </PaneMenu>
    );
  }

  getLastMenu(id, label) {
    const { pristine, submitting, handleSubmit } = this.props;
    return (
      <PaneMenu>
        <Button
          id={id}
          type="submit"
          title={label}
          disabled={pristine || submitting}
          onClick={handleSubmit}
        >
          {label}
        </Button>
      </PaneMenu>
    );
  }

  render() {
    const { initialValues } = this.props;
    const firstMenu = this.getAddFirstMenu();
    const paneTitle = initialValues.id ? <span>Edit: {_.get(initialValues, ['name'], '')} </span> : 'Create Vendor';
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-updatevendor', 'Update vendor') :
      this.getLastMenu('clickable-createnewvendor', 'Create vendor');

    return (
      <form id="form-vendor">
        <Pane defaultWidth="100%" firstMenu={firstMenu} lastMenu={lastMenu} paneTitle={paneTitle}>
          <FormVendor
            dropdown_currencies={this.getCurrencies()}
            dropdown_categories={this.getCategory()}
            dropdown_contact_categories={this.getContactCategory()}
            deleteVendor={this.deleteVendor}
            {...this.props}
          />
        </Pane>
      </form>
    )
  }

  panePreloader() { 
    const res = this.props.resources;
    if (res.localRes !== undefined && res.localRes !== null) {
      return res.localRes.panePreloader;
    } else {
      console.log('check this local data');
      return true;
    }
  }

  getCategory() {
    const { parentResources } = this.props;
    const data = (parentResources.vendorCategory || {}).records || [];
    if (!data || data.length === 0) return null;
    let newData = Convert.convertValueToLabel(data);
    return newData;
  }
  
  getContactCategory() {
    const { parentResources } = this.props;
    const data = (parentResources.vendorContactCategory || {}).records || [];
    if (!data || data.length === 0) return null;
    let newData = Convert.convertValueToLabel(data);
    return newData;
  }

  getCurrencies() {
    var arr = ['USD', 'CAD', 'GBP', 'EUR'];
    var dropdown_currencies = Convert.ArrayToObject(arr);
    return dropdown_currencies;
  }

  convertValueToLabel(resources_path) {
    let newArray = [];
    const resCat = resources_path;
    const arrLength = resCat.records.length - 1;
    if (arrLength >= 1) {
      const arr = resCat.records;
      // Convert value to label & id to value
      Object.keys(arr).map((key) => {
        let obj = {
          label: arr[key].value,
          value: arr[key].id
        };
        newArray.push(obj);
        if (Number(key) === arrLength) {
          return newArray;
        }
      });
    }
    return newArray;
  }

  deleteVendor(ID) {
    const { parentMutator } = this.props;
    parentMutator.records.DELETE({ id: ID }).then(() => {
      parentMutator.query.update({
        _path: `/vendor`,
        layer: null
      });
    });
  }
}

export default stripesForm({
  form: 'FormVendor',
  navigationCheck: true,
  enableReinitialize: true,
})(PaneDetails);