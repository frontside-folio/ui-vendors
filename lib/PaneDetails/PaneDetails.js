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
import { VendorForm } from '../VendorViews';
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
      vendorGETID: PropTypes.object,
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object
    }),
    parentMutator: PropTypes.object
  }
  
  constructor(props) {
    super(props);
    this.state = {
      dropdown: {
        payment_method_dd: [
          {
            "label": "-- Select --",
            "value": ""
          },
          {
            "label": "EFT",
            "value": "eft"
          },
          {
            "label": "Bank Draft",
            "value": "bank_draft"
          },
          {
            "label": "Paper Check",
            "value": "paper_check"
          },
          {
            "label": "Credit Card/P-Card",
            "value": "credit_card_p_card"
          },
          {
            "label": "Deposit Account",
            "value": "deposit_account"
          },
          {
            "label": "Cash",
            "value": "cash"
          }
        ],
        vendor_edi_code_dd: [
          {
            "label": "-- Select --",
            "value": ""
          },
          { label: 'Code', value: 'code' },
        ],
        vendor_edi_code_type_dd: [
          { "label": "-- Select --", "value": "" },
          { label: '31B', value: '31b' },
          { label: '014', value: '014' },
          { label: '091', value: '091' },
          { label: '092', value: '092' },
        ],
        library_edi_code_dd: [
          { label: "-- Select --", value: "" },
          { label: 'Code', value: 'code' },
        ],
        library_edi_code_type_dd: [
          { label: "-- Select --", value: "" },
          { label: '31B', value: '31b' },
          { label: '014', value: '014' },
          { label: '091', value: '091' },
          { label: '092', value: '092' },
        ],
        ftp_dd: [
          { label: "-- Select --", value: "" },
          { label: 'SFTP', value: 'sftp' },
          { label: 'FTP', value: 'ftp' },
        ],
        transmission_mode_dd: [
          { label: "-- Select --", value: "" },
          { label: 'ASCII', value: 'ascii' },
          { label: 'Binary', value: 'binary' },
        ],
        connection_mode_dd: [
          { label: "-- Select --", value: "" },
          { label: 'Passive', value: 'passive' },
          { label: 'Active', value: 'active' },
        ],
        delivery_method_dd: [
          { label: "-- Select --", value: "" },
          { label: 'Online', value: 'online' },
          { label: 'FTP', value: 'ftp' },
          { label: 'Email', value: 'email' },
        ],
        format_dd: [
          { label: "-- Select --", value: "" },
          { label: 'Delimited', value: 'Delimited' },
          { label: 'Excel', value: 'excel' },
          { label: 'CSV', value: 'csv' },
          { label: 'PDF', value: 'pdf' },
          { label: 'ASCII', value: 'ascii' },
          { label: 'HTML', value: 'html' },
          { label: 'Other', value: 'other' },
        ],
        status_dd: [
          { label: "-- Select --", value: "" },
          { label: 'Active', value: 'Active' },
          { label: 'Inactive', value: 'Inactive' },
          { label: 'Pending', value: 'Pending' },
        ]
      },
      paramID: []
    }

    this.deleteVendor = this.deleteVendor.bind(this);
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
          <VendorForm
          dropdown={this.state.dropdown}
          // dropdown_currencies={this.getCurrencies()}
          // dropdown_categories={this.getCategory()}
          // dropdown_contact_categories={this.getContactCategory()}
          parentMutator={this.props.mutator}
          parentResources={this.props.resources}
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

  initVal() {
    let data = null;
    const resVendor = this.props.resources.vendorGETID;
    if (resVendor != null) {
      if (resVendor.records.length >= 1) {
        return data = resVendor.records[0];
      }
    }
    return data;
  }

  // getCategory() {
  //   let data = null;
  //   const resCat = this.props.resources.vendorCategory;
  //   if (resCat != null) {
  //     let newData = Convert.convertValueToLabel(resCat);
  //     return newData;
  //   }
  //   return data;
  // }
  
  // getContactCategory() {
  //   let data = null;
  //   const resCat = this.props.resources.vendorContactCategory;
  //   if (resCat != null) {
  //     let newData = Convert.convertValueToLabel(resCat);
  //     return newData;
  //   }
  //   return data;
  // }

  // getCurrencies() {
  //   var arr = ['USD', 'CAD', 'GBP', 'EUR'];
  //   var dropdown_currencies = Convert.ArrayToObject(arr);
  //   return dropdown_currencies;
  // }

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

function asyncValidate(values, dispatch, props, blurredField) {
  console.log("asyc please disable");
  return new Promise(resolve => resolve());
}

export default stripesForm({
  form: 'VendorForm',
  // validate,
  asyncValidate,
  navigationCheck: true,
  enableReinitialize: true,
})(PaneDetails);