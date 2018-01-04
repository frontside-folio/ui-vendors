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
import Modal from '@folio/stripes-components/lib/Modal';
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
    super(props);
    this.state = {
      sections: {
        summarySection: true,
        contactInformationSection: true,
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
    this.deleteVendor = this.deleteVendor.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
  }

  componentWillMount() {
    this.props.parentMutator.localRes.update({ id: this.props.match.params.id });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialValues !== null) {
      if (this.props.match.params.id !== nextProps.match.params.id) {
        this.props.parentMutator.localRes.update({ id: nextProps.match.params.id });
      }
    }
  }

  render() {
    const lastMenu = (<PaneMenu>
      <Button type="submit" buttonStyle="primary paneHeaderNewButton">Update</Button>
    </PaneMenu>);
    
    const vendorName = this.getData() !== null ? this.props.initialValues.name : " ";
    const vendorID = this.getData() !== null ? this.props.initialValues.id : " ";

    if (this.getData() === null) {
      return (
        <Pane paneTitle="Edit Vendor" defaultWidth="50%" dismissible="true" onClose={this.props.onCloseDetails}>
          <p>Data is not available</p>
        </Pane>
      )
    } else {
      return (
        <form id="form-edit-vendor" onSubmit={this.props.handleSubmit(this.updateSet)}>
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
            <Modal dismissible={true} loseOnBackgroundClick={true} open={this.state.modalStatus} onClose={this.onCloseModal} label={"Delete " + vendorName + " Vendor"}>
              <p>{"Are you sure you want to delete " + vendorName + " vendor?"}</p>
              <br />
              <Row end="xs">
                <Col xs>
                  <Button type="button" buttonStyle="secondary paneHeaderNewButton" onClick={this.onCloseModal}>Cancel</Button>
                  <Button type="button" buttonStyle="error paneHeaderNewButton" onClick={() => { this.deleteVendor(vendorID) }}>Remove</Button>
                </Col>
              </Row>
            </Modal>
            <br/> 
            <Button type="button" buttonStyle="error block fullWidth paneHeaderNewButton" onClick={() => { this.onOpenModal() }} >Remove</Button>
          </Pane>
        </form>
      );
    }
    
    
  }

  getData() {
    console.log(this.props);
    let data = null;
    const initialVal = this.props.initialValues;
    if (initialVal != null) {
      data = initialVal.records;
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
    this.props.parentMutator.localRes.update({ id: null });
    this.props.parentMutator.vendor.PUT(data);
  }

  deleteVendor(ID) {
    this.props.parentMutator.localRes.replace({ id: null, query: 'query=(name=*)' });
    this.props.parentMutator.vendor.DELETE({ id: ID });
    this.props.history.push(`/vendors`);
  }

  onCloseModal() {
    this.setState({ modalStatus: false });
  }

  onOpenModal() {
    this.setState({ modalStatus: true });
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