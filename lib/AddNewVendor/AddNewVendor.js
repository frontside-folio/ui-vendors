import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Field } from "redux-form";
import queryString from "query-string";
// Folio
import transitionToParams from "@folio/stripes-components/util/transitionToParams";
import Paneset from "@folio/stripes-components/lib/Paneset";
import Pane from "@folio/stripes-components/lib/Pane";
import { Row, Col } from "@folio/stripes-components/lib/LayoutGrid";
import KeyValue from "@folio/stripes-components/lib/KeyValue";
import MultiColumnList from "@folio/stripes-components/lib/MultiColumnList";
import Button from "@folio/stripes-components/lib/Button";
import stripesForm from "@folio/stripes-form";
// Local Components
import SummaryEdit from "../Summary/SummaryEdit";

class AddNewVendor extends React.Component {
  constructor(props) {
    super(props);
    this.saveSet = this.saveSet.bind(this);
  }
  //  
  render() {
    const {handleSubmit} = this.props;
    return (
      <form id="form-add-new-vendor" onSubmit={handleSubmit(this.saveSet)}>
        <h1>Add New Vendor</h1>
        <SummaryEdit {...this.props} />
        <Row>
          <Col xs={12}>
            <Button type="submit" buttonStyle="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </form>
    );
  }

  saveSet(data) {
    const newData = Object.assign({}, data, {
      id: "8e92edc5-d461-461c-93f7-f49859eeac8a"
    });
    console.log(newData);
    // this.props.mutator.vendor.POST(data).then(() => {
    //   console.log("success");
    // });
  }
}

export default stripesForm({
  form: 'AddNewVendor',
  // validate,
  // asyncValidate,
  // asyncBlurFields: ['username'],
  allowRemoteSave: true,  
  navigationCheck: true,
  enableReinitialize: true,
})(AddNewVendor);