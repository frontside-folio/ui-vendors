import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

class ContactInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          test
        </Col>
      </Row>
    );
  }
}

export default ContactInformationView;