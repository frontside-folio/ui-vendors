import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Field } from "redux-form";
import queryString from "query-string";
// Folio
import transitionToParams from "@folio/stripes-components/util/transitionToParams";
import { AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import Paneset from "@folio/stripes-components/lib/Paneset";
import Pane from "@folio/stripes-components/lib/Pane";
import { Row, Col } from "@folio/stripes-components/lib/LayoutGrid";
import KeyValue from "@folio/stripes-components/lib/KeyValue";
import MultiColumnList from "@folio/stripes-components/lib/MultiColumnList";
import Button from "@folio/stripes-components/lib/Button";
import stripesForm from "@folio/stripes-form";
// Local Components
import { CreateSummary } from "../Summary";
import { CreateContactInformation } from '../ContactInformation';
import { CreateContactPeople } from '../ContactPeople';
import { CreateAgreements } from '../Agreements';
import { CreateVendorInformation } from '../VendorInformation';

import Convert from '../Utils/Convert';

class AddNewVendor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact_info_cat_dropdown: [
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
      contact_people_cat_dropdown: [
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
      vendor_currencies_dropdown: [],
      sections: {
        summarySection: false,
        contactInformationSection: false,
        contactPeopleSection: false,
        agreementsSection: false,
        vendorInformationSection: true,
      }
    }
    this.saveSet = this.saveSet.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
  }
  componentDidMount() {
    var vendor_currencies_dropdown = Convert.ArrayToObject('vendor_currencies_dropdown', ["USD", "CAD", "GBP", "EUR"]);
    this.setState(vendor_currencies_dropdown);
  }
  
  render() {
    const {handleSubmit} = this.props;
    return (
      <form id="form-add-new-vendor" onSubmit={handleSubmit(this.saveSet)}>
        <h1>Add New Vendor</h1>
        <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
        <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
          <Accordion label="Vendor Information" id="vendorInformationSection">
            <CreateVendorInformation {...this.props} {...this.state} />
          </Accordion>
          <Accordion label="Summary" id="summarySection">
            <CreateSummary {...this.props} {...this.state} />
          </Accordion>
          <Accordion label="Contact Information" id="contactInformationSection">
            <CreateContactInformation {...this.props} {...this.state} />
          </Accordion>
          <Accordion label="Contact People" id="contactPeopleSection">
            <CreateContactPeople {...this.props} {...this.state} />
          </Accordion>
          <Accordion  label="Agreements" id="agreementsSection">
            <CreateAgreements {...this.props} {...this.state} />
          </Accordion>
        </AccordionSet>
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

  onToggleSection({ label, id }) {
    this.setState((curState) => {
      let newState = _.cloneDeep(curState); // remember to safely copy state! using lodash's cloneDeep() for example.
      newState.sections[id] = !curState.sections[id];
      return newState;
    });
  }

  handleExpandAll(obj) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections = obj;
      return newState;
    });
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