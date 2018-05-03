import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import queryString from "query-string";
// Folio
import { AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import Pane from "@folio/stripes-components/lib/Pane";
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import { Row, Col } from "@folio/stripes-components/lib/LayoutGrid";
import Button from "@folio/stripes-components/lib/Button";
import Icon from '@folio/stripes-components/lib/Icon';
import IconButton from '@folio/stripes-components/lib/IconButton';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import IfInterface from '@folio/stripes-components/lib/IfInterface';
import Layer from '@folio/stripes-components/lib/Layer';
// Local Components
import { SummaryView } from "../Summary";
import { ContactInformationView } from '../ContactInformation';
import { ContactPeopleView } from '../ContactPeople';
import { AgreementsView } from '../Agreements';
import { VendorInformationView } from '../VendorInformation';
import { EdiInformationView } from '../EdiInformation';
import { InterfaceView } from '../Interface';
import { AccountsView } from '../Accounts';
import PaneDetails from '../PaneDetails';

class ViewVendor extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    dropdown: PropTypes.object,
    dropdown_currencies: PropTypes.array,
    dropdown_categories: PropTypes.array,
    dropdown_contact_categories: PropTypes.array,
    stripes: PropTypes.object.isRequired,
    onCloseEdit: PropTypes.func,
    parentResources: PropTypes.shape({}),
    parentMutator: PropTypes.shape({}),
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        summarySection: true,
        contactInformationSection:  false,
        contactPeopleSection: false,
        agreementsSection: false,
        vendorInformationSection: false,
        EDIInformationSection: false,
        interfaceSection: false,
        accountsSection: false,
      }
    }
    this.connectedPaneDetails = this.props.stripes.connect(PaneDetails);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  
  render() {
    const initialValues = this.getData();
    const query = location.search ? queryString.parse(location.search) : {};
    const lastMenu = (<PaneMenu>
      <IfPermission perm="vendor.item.put">
        <IconButton
          icon="edit"
          id="clickable-editvendor"
          style={{ visibility: !initialValues ? 'hidden' : 'visible' }}
          onClick={this.props.onEdit}
          href={this.props.editLink}
          title="Edit Vendor"
        />
      </IfPermission>
    </PaneMenu>);
    
    if (!initialValues) {
      return (
        <Pane id="pane-vendordetails" defaultWidth={this.props.paneWidth} paneTitle="Details" lastMenu={lastMenu} dismissible onClose={this.props.onClose}>
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    return (
      <Pane id="pane-vendordetails" defaultWidth={this.props.paneWidth} paneTitle={_.get(initialValues, ['name'], '')} dismissible="true" lastMenu={lastMenu} dismissible onClose={this.props.onClose}>
        <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle ={this.handleExpandAll} /></Col></Row>
        <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
          <Accordion label="Summary" id="summarySection">
            <SummaryView initialValues={initialValues} {...this.props} />
            <br />
          </Accordion>
          <Accordion label="Contact Information" id="contactInformationSection">
            <ContactInformationView initialValues={initialValues} {...this.props} />
            <br />
          </Accordion>
          <Accordion label="Contact People" id="contactPeopleSection">
            <ContactPeopleView initialValues={initialValues} {...this.props} />
            <br />
          </Accordion>
          <Accordion label="Agreements" id="agreementsSection">
            <AgreementsView initialValues={initialValues} {...this.props} />
            <br />
          </Accordion>
          <Accordion label="Vendor Information" id="vendorInformationSection">
            <VendorInformationView initialValues={initialValues} {...this.props} />
            <br />
          </Accordion>
          <Accordion label="EDI Information" id="EDIInformationSection">
            <EdiInformationView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label="Interface" id="interfaceSection">
            <InterfaceView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label="Accounts" id="accountsSection">
            <AccountsView initialValues={initialValues} {...this.props} />
          </Accordion>
        </AccordionSet>
        <Layer isOpen={query.layer ? query.layer === 'edit' : false} label="Edit Vendor Dialog">
          <this.connectedPaneDetails
            stripes={this.props.stripes}
            initialValues={initialValues}
            onSubmit={(record) => { this.update(record); }}
            onCancel={this.props.onCloseEdit}
            parentResources={this.props.parentResources}
            parentMutator={this.props.parentMutator}
          />
        </Layer>
      </Pane>
    )
  }

  getData() {
    const { parentResources, match: { params: { id } } } = this.props;
    const vendors = (parentResources.records || {}).records || [];
    if (!vendors || vendors.length === 0 || !id) return null;
    return vendors.find(u => u.id === id);
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

  update(data) {
    this.props.parentMutator.records.PUT(data).then(() => {
      this.props.onCloseEdit();
    });
  }
}

export default ViewVendor;