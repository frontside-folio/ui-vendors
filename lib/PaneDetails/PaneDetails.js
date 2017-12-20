import React from 'react';
import Route from 'react-router-dom/Route';
import PropTypes from 'prop-types';
// Local Components
import { AddNewVendor, EditVendor, ViewVendor } from '../VendorViews';
// Utils
import Convert from '../Utils/Convert';

class PaneDetails extends React.Component {
  static propTypes = {
    onCloseDetails: PropTypes.func.isRequired,
    // react-route properties provided by withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
      dropdown: {
        payment_method_dd: [
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
          { label: 'Code', value: 'code' },
        ],
        vendor_edi_code_type_dd: [
          { label: '31B', value: '31b' },
          { label: '014', value: '014' },
          { label: '091', value: '091' },
          { label: '092', value: '092' },
        ],
        library_edi_code_dd: [
          { label: 'Code', value: 'code' },
        ],
        library_edi_code_type_dd: [
          { label: '31B', value: '31b' },
          { label: '014', value: '014' },
          { label: '091', value: '091' },
          { label: '092', value: '092' },
        ],
        ftp_dd: [
          { label: 'SFTP', value: 'sftp' },
          { label: 'FTP', value: 'ftp' },
        ],
        transmission_mode_dd: [
          { label: 'ASCII', value: 'ascii' },
          { label: 'Binary', value: 'binary' },
        ],
        connection_mode_dd: [
          { label: 'Passive', value: 'passive' },
          { label: 'Active', value: 'active' },
        ],
        delivery_method_dd: [
          { label: 'Online', value: 'online' },
          { label: 'FTP', value: 'ftp' },
          { label: 'Email', value: 'email' },
        ],
        format_dd: [
          { label: 'Delimited', value: 'Delimited' },
          { label: 'Excel', value: 'excel' },
          { label: 'CSV', value: 'csv' },
          { label: 'PDF', value: 'pdf' },
          { label: 'ASCII', value: 'ascii' },
          { label: 'HTML', value: 'html' },
          { label: 'Other', value: 'other' },
        ],
        status_dd: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Pending', value: 'pending' },
        ]
      }
   }
    // Connect
    this.connectedAddNewVendor = this.props.stripes.connect(AddNewVendor);
    this.connectedEditVendor = this.props.stripes.connect(EditVendor);
    this.connectedViewVendor = this.props.stripes.connect(ViewVendor);
    // Get Data and Categories
    this.getData = this.getData.bind(this);
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
              onCloseDetails={this.onCloseDetails}
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
              onCloseDetails={this.onCloseDetails}
              initialValues={this.getData()}
              dropdown={this.state.dropdown}
              dropdown_currencies={this.getCurrencies()}
              dropdown_categories={this.getCategory()}
              dropdown_contact_categories={this.getContactCategory()}
              parentMutator={this.props.mutator}
              parentResources={this.props.resources}
              {...props}
            />}
          />
        }
        <Route
          path={`${this.props.match.path}/view/:id`}
          render={props => <this.connectedViewVendor
          stripes={this.props.stripes}
          onCloseDetails={this.onCloseDetails}
          parentResources={this.props.resources}
          parentMutator={this.props.mutator}
          dropdown={this.state.dropdown}
          dropdown_currencies={this.state.dropdown_currencies}
          onCloseDetails={this.props.onCloseDetails}
          {...this.state}
          {...props}
          />}
        />
       </div>
    );
  }

  getData() {
    let data = null;
    const resVendor = this.props.resources.vendor;
    if (resVendor != null) {
      if(resVendor.records.length >= 1) {
        data = resVendor.records;
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
 
  getCurrencies() {
    var arr = ['USD', 'CAD', 'GBP', 'EUR'];
    var dropdown_currencies = Convert.ArrayToObject('', arr);
    return dropdown_currencies;
  }
}

export default PaneDetails;