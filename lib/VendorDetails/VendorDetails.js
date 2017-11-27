import React from 'react';
import PropTypes from 'prop-types';

import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';

import Summary from '../Summary';

class VendorDetails extends React.Component {
  static propTypes = {
    resources: PropTypes.shape({
      vendor : PropTypes.shape({
        hasLoaded: PropTypes.bool.isRequired,
        records: PropTypes.arrayOf(
          PropTypes.shape({
            total_records: PropTypes.number.isRequired
          }),
        ),
      }),
    }),
    // react-route properties provided by withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = {
      dataDetails: {}
    }
  }


  render() {
    const { match, ...rest } = this.props;
    let SummaryComp = null;
    if ((this.props.resources.vendor !== null) && (this.props.resources.vendor.hasLoaded === true)) {
      SummaryComp = <Summary {...this.props} />;
    }

    return (
      <Pane paneTitle="Data listing" defaultWidth="50%">
        {SummaryComp}
      </Pane>
    );  
  }
}

export default VendorDetails;