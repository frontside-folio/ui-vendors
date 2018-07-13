import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Fields } from 'redux-form';
// Folio
import { AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
// Local Components
import HandleErrors from '../Utils/HandleErrors';
import { SummaryForm } from '../Summary';
import { ContactInformationForm } from '../ContactInformation';
import { ContactPeopleForm } from '../ContactPeople';
import { AgreementsForm } from '../Agreements';
import { VendorInformationForm } from '../VendorInformation';
import { EdiInformationForm } from '../EdiInformation';
import { InterfaceForm } from '../Interface';
import { AccountsForm } from '../Accounts';

class FormVendor extends Component {
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
      },
      sectionErrors: {
        summaryError: false
      }
    };
    this.deleteVendor = this.deleteVendor.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.updateSectionErrors = this.updateSectionErrors.bind(this);
  }

  updateSectionErrors(obj) {
    this.setState({ sectionErrors: obj });
  }

  onToggleSection({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
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
        _path: '/vendors',
        layer: null
      });
    });
  }

  render() {
    const { initialValues } = this.props;
    const { sectionErrors } = this.state;
    const showDeleteButton = initialValues.id || false;
    // Errors
    const summeryError = sectionErrors.summaryError ? <em style={{ color: 'red' }}>Required fields!</em> : '';


    return (
      <div id="form-add-new-vendor">
        <Row center="xs" style={{ textAlign: 'left' }}>
          <Fields names={['name', 'code', 'addresses']} component={HandleErrors} data={sectionErrors} updateSectionErrors={this.updateSectionErrors} />
          <Col xs={12} md={8}>
            <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
          </Col>
          <Col xs={12} md={8}>
            <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
              <Accordion label="Summary" id="summarySection" displayWhenClosed={summeryError} displayWhenOpen={summeryError}>
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
            <IfPermission perm="vendor.item.delete">
              <Row end="xs">
                <Col xs={12}>
                  {
                    showDeleteButton &&
                    <Button type="button" buttonStyle="danger" onClick={() => { this.deleteVendor(this.props.initialValues.id); }}>Remove</Button>
                  }
                </Col>
              </Row>
            </IfPermission>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormVendor;
