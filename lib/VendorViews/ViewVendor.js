import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Field } from "redux-form";
import queryString from "query-string";
import { withRouter } from "react-router";
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
import { SummaryView } from "../Summary";
import { ContactInformationView } from '../ContactInformation';
import { ContactPeopleForm } from '../ContactPeople';
import { AgreementsForm } from '../Agreements';
import { VendorInformationForm } from '../VendorInformation';
import { EdiInformationForm } from '../EdiInformation';
import { InterfaceForm } from '../Interface';
import { AccountsForm } from '../Accounts';

class ViewVendor extends React.Component {
  static propTypes = {
    stripes: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
    dropdown: PropTypes.object.isRequired,
    dropdown_currencies: PropTypes.array.isRequired,
    dropdown_categories: PropTypes.array.isRequired,
    dropdown_contact_categories: PropTypes.array.isRequired,
    onCloseDetails: PropTypes.func.isRequired,
    parentMutator: PropTypes.object.isRequired,
    ParentResources: PropTypes.shape({
      vendorGETID: PropTypes.object,
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        summarySection: true,
        contactInformationSection:  true,
        contactPeopleSection: false,
        agreementsSection: false,
        vendorInformationSection: false,
        EDIInformationSection: false,
        interfaceSection: false,
        accountsSection: false,
      },
      initialValues: {}
    }
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
    this.onEdit = this.onEdit.bind(this);
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
    const { initialValues } = this.props;
    const lastMenu = (<PaneMenu>
      <button id="edit-vendor" onClick={this.onEdit} title="Edit Vendor"><Icon icon="edit" />Edit</button>
    </PaneMenu>);

    if (this.getData() === null) {
      return (
        <Pane paneTitle="View Vendor" defaultWidth="50%" dismissible={true} onClose={this.props.onCloseDetails}>
          <p>Data is not available</p>
        </Pane>
      )
    } else {
      return (
        <Pane paneTitle={initialValues.name} defaultWidth="50%" dismissible="true" lastMenu={lastMenu} onClose={this.props.onCloseDetails}>
          <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle ={this.handleExpandAll} /></Col></Row>
          <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
            <Accordion label="Summary" id="summarySection">
              <SummaryView {...this.props} />
              <br />
            </Accordion>
            <Accordion label="Contact Information" id="contactInformationSection">
              <ContactInformationView {...this.props} />
              <br />
            </Accordion>
            {/*
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
          */}
            </AccordionSet>
        </Pane>
      )
    }
  }

  getData() {
    let data = null;
    const initialVal = this.props.initialValues;
    if (initialVal != null) {
      data = initialVal.records;
    }
    return data;
  }

  onEdit() {
    var ID = this.props.initialValues.id;
    this.props.parentMutator.localRes.update({ id: `${ID}` });
    this.props.history.push(`/vendors/edit/${ID}`);
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
}

export default ViewVendor;