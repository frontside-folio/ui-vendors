import React from 'react';
import Route from 'react-router-dom/Route';
import PropTypes from 'prop-types';
// Local Components
import AddNewVendor from '../AddNewVendor';
// Utils
import Convert from '../Utils/Convert';

class PaneDetails extends React.Component {
  static propTypes = {
    paneTitle: PropTypes.string.isRequired,
    paneDetailsStatus: PropTypes.bool.isRequired,
    paneWidth: PropTypes.string.isRequired,
    dataListingFullWidth: PropTypes.bool.isRequired,
    paneDetailsLoading: PropTypes.bool,
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
        contact_info_cat_dd: [
          {
            "id": "0e3f9680-ab06-4565-af64-609b7364e6eb",
            "value": "Returns"
          },
          {
            "id": "996ecd31-7ca4-4d8d-9bbf-bc94dff5f6c6",
            "value": "Payments"
          },
          {
            "id": "112ae2e4-88ae-4fa5-a75b-2379d2035e52",
            "value": "Customer Service"
          },
          {
            "id": "56288fe8-8037-44da-8395-01d2d106dc54",
            "value": "Shipments"
          }
        ],
        contact_people_cat_dd: [
          {
            "id": "08e0eb27-b57f-4638-a703-9a2c57bd8708",
            "value": "Accounting"
          },
          {
            "id": "a5da9c44-6619-403f-bd3b-f9bd2f63bc59",
            "value": "Books"
          },
          {
            "id": "da0272e4-7ff7-4ea8-9bc9-9d9cd5c81580",
            "value": "Customer Service"
          },
          {
            "id": "ab18897b-0e40-4f31-896b-9c9adc979a88",
            "value": "Ebooks"
          }
        ],
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
      },
      vendor_currencies_dd: [],
    }
    // Vendor Details
    // this.connectedApp = this.props.stripes.connect(ViewSummary);
    // this.connectedVendorDetails = this.props.stripes.connect(ViewSummary);
    this.connectedAddNewVendor = this.props.stripes.connect(AddNewVendor);
  }

  render() {
    const { match, location, history, ...rest } = this.props;
    // const vendorDetailsPane = (
    //   <Route
    //     path={`${this.props.match.path}/view/:id`}
    //     render={props => <this.connectedVendorDetails
    //       paneTitle="Data listing"
    //       paneID="VedorDetails"
    //       paneWidth={this.state.paneWidth}
    //       onCloseDetails={this.onCloseDetails}
    //       {...this.props} />
    //     }
    //   />
    // );
    return (
      <div>
        <Route
          path={`${this.props.match.path}/new/:id`}
          render={props => <this.connectedAddNewVendor
            paneTitle="Add New Vendor"
            paneID="AddNewVendor"
            paneWidth={this.state.paneWidth}
            onCloseDetails={this.onCloseDetails}
            {...this.props}
            {...this.state} 
            />
          }
        />
      </div>
    );  
  }

  componentWillMount() {
    var arr = ['USD', 'CAD', 'GBP', 'EUR'];
    var vendor_currencies_dd = Convert.ArrayToObject('vendor_currencies_dd', arr);
    this.setState(vendor_currencies_dd);
  }
}

export default PaneDetails;