import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid';

import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import AddressView from '@folio/stripes-components/lib/structures/AddressFieldGroup/AddressView';
import css from "../ContactInformationView.css";

class ContactInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    dropdown_categories: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.getEmail = this.getEmail.bind(this);
  }

  render() {
    const { dataVal } = this.props;
    return (
      <Col xs={12} className={css.rowHeader}>
        <h4>Email Address</h4>
        {dataVal.map(this.getEmail)}
      </Col>
    );
  }

  getEmail(val, key) {
    const rowCount = (this.props.dataVal.length - 1) !== key ? true : false;
    const visibleFields = ['email', 'description', 'categories', 'language'];
    const headerFormatter = () => null;
    // Parse Categories
    const categories = val.categories && this.props.dropdown_categories ? this.props.parseCategories(val.categories) : null;
    const addObj = _.assign({
      id: uuid(),
      language: val.language,
      categories: categories,
    },
      val.email
    )
    console.log(val);

    return (
      <div key={key}>
        <AddressView uiId={uuid()} key={uuid()} headerFormatter={headerFormatter} addressObject={addObj} visibleFields={visibleFields} />
        {rowCount && <hr />}
      </div>
    )
  }

  parseCategories(val) {
    var arr = [];
    var dropdownCategories = this.props.dropdown_categories;
    val.forEach(function (val1, key1) {
      dropdownCategories.forEach(function (val2, key2) {
        if (val1 === val2.value) {
          arr.push(val2.label);
        }
      });
    });
    return arr.join(', ');
  }
}

export default ContactInformationView;