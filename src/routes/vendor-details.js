import React from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

console.log("details page is showing up");

class VendorDetails extends React.Component {
  static propTypes = {
    // react-route properties provided by withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }


  render() {
    const { match } = this.props;
    return (
      <Pane paneTitle="Data listing" defaultWidth="40%">
        <Row>
          <Col xs={12}>
            <h1>{match.params.id}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut facilisis ex. Proin ultrices, urna vitae accumsan commodo, elit arcu commodo sapien, non consequat justo leo ut tellus. Donec eu aliquet felis. Sed commodo diam enim, quis rutrum lacus vestibulum ac. Morbi dapibus lorem dui, eget consequat mi lobortis congue. Aliquam nisi est, maximus et pulvinar nec, gravida non nisl. Sed quis laoreet nunc. Aenean sed posuere lacus. Aliquam molestie urna augue, quis vestibulum purus sollicitudin sit amet.</p>
            <p>Fusce eu nulla interdum, eleifend lacus eu, tempor libero. Suspendisse commodo sem sed mi viverra, nec aliquet ligula ornare. Duis quis ex at justo cursus blandit in id tellus. Donec tincidunt ultrices nunc, non pharetra dui mattis sit amet. Duis fringilla consequat lectus sed egestas. Donec molestie, mauris nec feugiat luctus, erat nisl ornare ipsum, nec tristique metus dolor quis dui. Etiam non fringilla ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam cursus viverra semper. Nam vitae eleifend ipsum. Vivamus odio dui, pretium id nibh eget, lacinia rutrum ligula. Aliquam eget eros in magna pharetra congue non quis erat. Nam magna mauris, molestie id nisi viverra, efficitur condimentum orci. Vestibulum in euismod lectus, quis ornare urna.</p>
          </Col>
        </Row>
      </Pane>
    );
  }
}

export default VendorDetails;