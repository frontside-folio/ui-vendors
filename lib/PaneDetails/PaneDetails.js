import React from 'react';
import Route from 'react-router-dom/Route';
import PropTypes from 'prop-types';


import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';

import Summary from '../Summary';

class PaneDetails extends React.Component {
  static propTypes = {
    // resources: PropTypes.shape({
    //   vendor : PropTypes.shape({
    //     hasLoaded: PropTypes.bool.isRequired,
    //     records: PropTypes.arrayOf(
    //       PropTypes.shape({
    //         total_records: PropTypes.number.isRequired
    //       }),
    //     ),
    //   }),
    // }),
    paneTitle: PropTypes.string.isRequired,
    paneID: PropTypes.string.isRequired,
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
  };
  
  constructor(props) {
    super(props);
    this.state = {}

    // Vendor Details
    this.connectedApp = this.props.stripes.connect(Summary);
    // this.connectedVendorDetails = this.props.stripes.connect(PaneDetails);
    // this.connectedAddNewVendor = this.props.stripes.connect(PaneDetails);
    this.paneContent = this.paneContent.bind(this);
  }


  render() {
    const { paneID, match, location, history, ...rest } = this.props;
    console.log(this.props.match.path);
    // let SummaryComp = null;
    let paneContent = null;
    paneContent
    if (paneID === 'vendorDetails') {
      paneContent = (<Route path={`${this.props.match.path}/view/:id`} render={props => <this.connectedApp {...this.props} />} />);
    } else if (paneID === 'addNewVendor') {
      paneContent = (<Route path={`${this.props.match.path}/new/:id`} render={props => <this.connectedApp {...this.props} />} />);
    }
    // if ((this.props.resources.vendor !== null) && (this.props.resources.vendor.hasLoaded === true)) {
    //   // SummaryComp = <Summary {...this.props} />;
    // }
    // const connectedSummary = (() => {
    //   console.log("test");
    //   return(
    //     <Route path={`${this.props.match.path}/view/:id`} render={props => <this.connectedApp {...this.props} />}/>
    //   )
    // });
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
    // const addVendorPane = (
    //   <Route
    //     path={`${this.props.match.path}/new/:id`}
    //     render={props => <this.connectedAddNewVendor
    //       paneTitle="Add New Vendor"
    //       paneID="AddNewVendor"
    //       paneWidth={this.state.paneWidth}
    //       onCloseDetails={this.onCloseDetails}
    //       {...this.props} />
    //     }
    //   />
    // );

    return (
      <Pane paneTitle={this.props.paneTitle} defaultWidth="50%" dismissible="true" onClose={this.props.onCloseDetails}>
        
        <Route path={`${this.props.match.path}/view/:id`} render={props => <this.connectedApp {...this.props} />} />
      </Pane>
    );  
  }

  // { this.paneContent() }

  paneContent() {
    return(<p>{this.props.paneTitle}</p>);
  }

  
}

export default PaneDetails;