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
import IfPermission from '@folio/stripes-components/lib/IfPermission';
// Local Components
import { SummaryForm } from "../Summary";
import { ContactInformationForm } from '../ContactInformation';
import { ContactPeopleForm } from '../ContactPeople';
import { AgreementsForm } from '../Agreements';
import { VendorInformationForm } from '../VendorInformation';
import { EdiInformationForm } from '../EdiInformation';
import { InterfaceForm } from '../Interface';
import { AccountsForm } from '../Accounts';

class FormVendor extends React.Component {

  static propTypes = {
    initialValues: PropTypes.object,
    deleteLedger: PropTypes.func,
    parentMutator: PropTypes.object.isRequired,
    parentResources: PropTypes.object.isRequired,
  }

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
    this.deleteVendor = this.deleteVendor.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  
  render() {
    const { handleSubmit, submitting, pristine, initialValues } = this.props;
    const showDeleteButton = initialValues.id ? true : false;
    
    return (
      <div id="form-add-new-vendor">
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
          <Accordion  label="Agreements" id="agreementsSection">
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
        <IfPermission perm="vendor.item.delete">
          <Row end="xs">
            <Col xs={12}>
              {
                showDeleteButton &&
                <Button type="button" buttonStyle={'danger'} onClick={() => { this.deleteVendor(this.props.initialValues.id) }}>Remove</Button>
              }
            </Col>
          </Row>
        </IfPermission>
      </div>
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

  deleteVendor(ID) {
    const { parentMutator } = this.props;
    parentMutator.records.DELETE({ id: ID }).then(() => {
      parentMutator.query.update({
        _path: `/vendors`,
        layer: null
      });
    });
  }

  saveSet(data) {
    this.props.parentMutator.vendor.POST(data);
    this.props.history.push(`/vendors`);
  }
}

export default FormVendor;