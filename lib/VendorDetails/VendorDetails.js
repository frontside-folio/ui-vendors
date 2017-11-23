import React from 'react';
import PropTypes from 'prop-types';

import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';

import Summary from '../Summary';

class VendorDetails extends React.Component {
  static propTypes = {
    dataDetails: PropTypes.object.isRequired,
    // react-route properties provided by withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = {
      dataStatus: false,
      dataDetails: {}
    }
  }


  render() {
    const { match, ...rest } = this.props;
    const checkStatus = () => { if (this.props.dataDetails.vendor !== null) {
      this.props.dataDetails.vendor.records.map((item, i) => {
        if (item === null) {
          return (<p key={i}>No data available</p>);
        } else {
          return item.vendors.map((item2, i2) => {
            if (item2 === null) {
              return (<p key={i2}>No data available</p>);
            } else {
              return true;
            }
          });
        }
      });
    }}

    return (
      <Pane paneTitle="Data listing" defaultWidth="50%">
        { checkStatus && 
          <Summary {...this.props} />
        }
      </Pane>
    );  
  }
}

export default VendorDetails;