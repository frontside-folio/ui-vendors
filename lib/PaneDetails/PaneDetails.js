import React from 'react';
import Route from 'react-router-dom/Route';
import PropTypes from 'prop-types';
// Local Components
import { AddNewVendor, EditVendor, ViewVendor, ViewBarcodeScanner} from '../VendorViews';
// Utils
import Convert from '../Utils/Convert';

class PaneDetails extends React.Component {
  static propTypes = {
    onCloseDetails: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    resources: PropTypes.shape({
      vendorGETID: PropTypes.object,
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object
    })
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
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Pending', value: 'pending' },
        ]
      },
      paramID: []
   }
    
    // Connect
    this.connectedAddNewVendor = this.props.stripes.connect(AddNewVendor);
    this.connectedEditVendor = this.props.stripes.connect(EditVendor);
    this.connectedViewVendor = this.props.stripes.connect(ViewVendor);
    this.connectedViewBarcodeScanner = this.props.stripes.connect(ViewBarcodeScanner);
    // Get Data and Categories
    this.initVal = this.initVal.bind(this);
    this.getContactCategory = this.getContactCategory.bind(this);
    this.getContactCategory = this.getContactCategory.bind(this);
  }

  render() {
    const is_categories = (this.getCategory() === null && this.getContactCategory() === null) ? false : true;
    return (
      <div style={{width:'100%'}}>
        { is_categories &&
          <Route
            path={`${this.props.match.path}/new`}
            render={props => <this.connectedAddNewVendor
              dropdown={this.state.dropdown}
              dropdown_currencies={this.getCurrencies()}
              dropdown_categories={this.getCategory()}
              dropdown_contact_categories={this.getContactCategory()}
              parentMutator={this.props.mutator}
              parentResources={this.props.resources}
              onCloseDetails={this.props.onCloseDetails}
              {...props}
              />
            }
          />
        }
        {is_categories &&
          <Route
            path={`${this.props.match.path}/edit/:id`}
            render={props => <this.connectedEditVendor
              stripes={this.props.stripes}
              initialValues={this.initVal()}
              dropdown={this.state.dropdown}
              dropdown_currencies={this.getCurrencies()}
              dropdown_categories={this.getCategory()}
              dropdown_contact_categories={this.getContactCategory()}
              parentMutator={this.props.mutator}
              parentResources={this.props.resources}
              onCloseDetails={this.props.onCloseDetails}
              {...props}
            />}
          />
        }
        {is_categories &&
          <Route
            path={`${this.props.match.path}/view/:id`}
            render={props => <this.connectedViewVendor
              stripes={this.props.stripes}
              initialValues={this.initVal()}
              dropdown={this.state.dropdown}
              dropdown_currencies={this.getCurrencies()}
              dropdown_categories={this.getCategory()}
              dropdown_contact_categories={this.getContactCategory()}
              parentResources={this.props.resources}
              parentMutator={this.props.mutator}
              onCloseDetails={this.props.onCloseDetails}
              {...props}
            />}
          />
         }
        <Route
          path={`${this.props.match.path}/link-scanner`}
          render={props => <this.connectedViewBarcodeScanner
            stripes={this.props.stripes}
            parentResources={this.props.resources}
            parentMutator={this.props.mutator}
            onCloseDetails={this.props.onCloseDetails}
            onScanItem={this.props.onScanItem}
            scanned_data_key={this.props.scanned_data_key}
            {...props}
          />}
        />
       </div>
    );
  }

  initVal() {
    let data = null;
    const resVendor = this.props.resources.vendorGETID;
    if (resVendor != null) {
      if(resVendor.records.length >= 1) {
        data = resVendor.records[0];
      }
    }
    return data;
  }

  getCategory() {
    let data = null;
    const resCat = this.props.resources.vendorCategory;
    if (resCat != null) {
      let newData = Convert.convertValueToLabel(resCat);
      return newData;
    }
    return data;
  }
  
  getContactCategory() {
    let data = null;
    const resCat = this.props.resources.vendorContactCategory;
    if (resCat != null) {
      let newData = Convert.convertValueToLabel(resCat);
      return newData;
    }
    return data;
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
}

export default PaneDetails;