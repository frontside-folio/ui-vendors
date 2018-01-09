import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid';

import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import AddressView from '@folio/stripes-components/lib/structures/AddressFieldGroup/AddressView';


class ContactInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.getAddress = this.getAddress.bind(this);
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues ? initialValues : [];
    // console.log(this.props);
    return (
      <Row>
        <Col xs={12}>
          {dataVal.addresses.map(this.getAddress)}
        </Col>
      </Row>
    );
  }


  getAddress(val, key) {
    const rowCount = (this.props.initialValues.addresses.length - 1) !== key ? true : false;
    const visibleFields = ['addressLine1', 'addressLine2', 'city', 'stateRegion', 'country', 'zipCode', 'categories', 'language'];
    const headerFormatter = () => null;
    // Build Objects
    const categories = val.categories.toString();
    const addObj = _.assign({
      id: uuid(),
      language: val.language,
      categories: categories,
      san_code: val.san_code
    })

    return (
      <div key={key}>
        <AddressView uiId={uuid()} key={uuid()} headerFormatter={headerFormatter} addressObject={val.address} visibleFields={visibleFields} />
        { rowCount && <hr /> }
      </div>
    )
  }
}

export default ContactInformationView;