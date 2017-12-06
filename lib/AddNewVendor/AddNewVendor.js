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
import Icon from '@folio/stripes-components/lib/Icon';
// Local Components
import { CreateSummary } from "../Summary";
import { CreateContactInformation } from '../ContactInformation';
import { CreateContactPeople } from '../ContactPeople';
import { CreateAgreements } from '../Agreements';
import { CreateVendorInformation } from '../VendorInformation';
import { CreateEdiInformation } from '../EdiInformation';

class AddNewVendor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: {
        summarySection: false,
        contactInformationSection: false,
        contactPeopleSection: false,
        agreementsSection: false,
        vendorInformationSection: false,
        EDIInformationSection: true,
      }
    }
    this.saveSet = this.saveSet.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  
  render() {
    const {handleSubmit} = this.props;
    return (
      <Pane paneTitle="Add New Vendor" defaultWidth="50%" dismissible="true" onClose={this.props.onCloseDetails}>
        <form id="form-add-new-vendor" onSubmit={handleSubmit(this.saveSet)}>
          <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
          <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
            <Accordion label="EDI Information" id="EDIInformationSection">
              <CreateEdiInformation {...this.props} />
              <br />
            </Accordion>
            <Accordion label="Summary" id="summarySection">
              <CreateSummary {...this.props} />
              <br />
            </Accordion>
            <Accordion label="Contact Information" id="contactInformationSection">
              <CreateContactInformation {...this.props} />
              <br />
            </Accordion>
            <Accordion label="Contact People" id="contactPeopleSection">
              <CreateContactPeople {...this.props} />
              <br />
            </Accordion>
            <Accordion  label="Agreements" id="agreementsSection">
              <CreateAgreements {...this.props} />
              <br />
            </Accordion>
            <Accordion label="Vendor Information" id="vendorInformationSection">
              <CreateVendorInformation {...this.props} />
              <br />
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
      </Pane>
    );
  }

  onEdit() {
    console.log("this is the edit button");
  }

  onToggleSection({ label, id }) {
    this.setState((curState) => {
      let newState = _.cloneDeep(curState);
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