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
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import { Row, Col } from "@folio/stripes-components/lib/LayoutGrid";
import KeyValue from "@folio/stripes-components/lib/KeyValue";
import MultiColumnList from "@folio/stripes-components/lib/MultiColumnList";
import Button from "@folio/stripes-components/lib/Button";
import stripesForm from "@folio/stripes-form";
import Icon from '@folio/stripes-components/lib/Icon';
// Local Components
import Changelog from '../Changelog';
import { CreateSummary } from "../Summary";
import { CreateContactInformation } from '../ContactInformation';
import { CreateContactPeople } from '../ContactPeople';
import { CreateAgreements } from '../Agreements';
import { CreateVendorInformation } from '../VendorInformation';
import { CreateEdiInformation } from '../EdiInformation';
import { CreateInterface } from '../Interface';
import { CreateAccounts } from '../Accounts';


class AddNewVendor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: {
        summarySection: true,
        contactInformationSection: false,
        contactPeopleSection: false,
        agreementsSection: false,
        vendorInformationSection: false,
        EDIInformationSection: false,
        interfaceSection: false,
        accountsSection: false,
      }
    }
    this.saveSet = this.saveSet.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  
  render() {
    console.log(this.props);
    const {handleSubmit} = this.props;
    const lastMenu = (<PaneMenu>
      <ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} />
      <Button type="submit" buttonStyle="primary paneHeaderNewButton">Submit</Button>
    </PaneMenu>);
    
    return (
      <form id="form-add-new-vendor" onSubmit={handleSubmit(this.saveSet)}>
        <Pane paneTitle="Add New Vendor" defaultWidth="50%" dismissible="true" lastMenu={lastMenu} onClose={this.props.onCloseDetails}>
          <Row end="xs"><Col xs></Col></Row>
          <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
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
            <Accordion label="EDI Information" id="EDIInformationSection">
              <CreateEdiInformation {...this.props} />
            </Accordion>
            <Accordion label="Interface" id="interfaceSection">
              <CreateInterface {...this.props} />
            </Accordion>
            <Accordion label="Accounts" id="accountsSection">
              <CreateAccounts {...this.props} />
            </Accordion>
          </AccordionSet>
          <Changelog initialValues={this.props.resources.rest_vendor.records[0].vendors[0]} />
        </Pane>
      </form>
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
  // validate,l
  // asyncValidate,
  allowRemoteSave: false,  
  navigationCheck: true,
  enableReinitialize: true,
})(AddNewVendor);