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
import { SummaryForm } from "../Summary";
import { ContactInformationForm } from '../ContactInformation';
import { ContactPeopleForm } from '../ContactPeople';
import { AgreementsForm } from '../Agreements';
import { VendorInformationForm } from '../VendorInformation';
import { EdiInformationForm } from '../EdiInformation';
import { InterfaceForm } from '../Interface';
import { AccountsForm } from '../Accounts';

class EditVendor extends React.Component {

  constructor(props) {
    // console.log(props);
    super(props);
    this.state = {
      sections: {
        summarySection: true,
        contactInformationSection:  true,
        contactPeopleSection: true,
        agreementsSection: true,
        vendorInformationSection: true,
        EDIInformationSection: true,
        interfaceSection: true,
        accountsSection: true,
      }
    }
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.updateSet = this.updateSet.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.props.parentMutator.localRes.replace({ id: this.props.match.params.id });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.parentMutator.localRes.replace({ id: nextProps.match.params.id });
    }
  }
  
  render() {
    const { handleSubmit, match, getID } = this.props;
    // Get Param ID and pass it back to Pane details to get data based on ID
    // const getParam = match.params.id !== undefined ? getID(match.params.id) : getID(null);
    // Last Menu
    const lastMenu = (<PaneMenu>
      <ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} />
      <Button type="submit" buttonStyle="primary paneHeaderNewButton">Update</Button>
    </PaneMenu>);

    return (
      <form id="form-edit-vendor" onSubmit={handleSubmit(this.updateSet)}>
        <Pane paneTitle="Edit Vendor" defaultWidth="50%" dismissible="true" lastMenu={lastMenu} onClose={this.props.onCloseDetails}>
          <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
          <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
            <Accordion label="Summary" id="summarySection">
              <SummaryForm {...this.props} />
              <br />
            </Accordion>
            <Accordion label="Contact Information" id="contactInformationSection">
              <ContactInformationForm {...this.props} />
              <br />
            </Accordion>
            <Accordion label="Contact People" id="contactPeopleSection">
              <ContactPeopleForm {...this.props} />
              <br />
            </Accordion>
            <Accordion label="Agreements" id="agreementsSection">
              <AgreementsForm {...this.props} />
              <br />
            </Accordion>
            <Accordion label="Vendor Information" id="vendorInformationSection">
              <VendorInformationForm {...this.props} />
              <br />
            </Accordion>
            <Accordion label="EDI Information" id="EDIInformationSection">
              <EdiInformationForm {...this.props} />
            </Accordion>
            <Accordion label="Interface" id="interfaceSection">
              <InterfaceForm {...this.props} />
            </Accordion>
            <Accordion label="Accounts" id="accountsSection">
              <AccountsForm {...this.props} />
            </Accordion>
          </AccordionSet>
        </Pane>
      </form>
    );
  }

  getData() {
    let data = null;
    const resVendor = this.props.parentResources.vendor;
    if (resVendor != null) {
      if (resVendor.records.length >= 1) {
        data = resVendor.records;
      }
    }
    return data;
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

  updateSet(data) {
    const newData = Object.assign({}, data, {
      id: "8e92edc5-d461-461c-93f7-f49859eeac8a"
    });
    
  }
}

export default stripesForm({
  form: 'EditVendor',
  allowRemoteSave: false,
  // validate,
  // asyncValidate,
  navigationCheck: false,
  enableReinitialize: true,
})(EditVendor);