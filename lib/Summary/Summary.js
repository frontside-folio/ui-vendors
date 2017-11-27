import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Route from 'react-router-dom/Route';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Button from '@folio/stripes-components/lib/Button';


class Summary extends React.Component {
  static propTypes = {
    resources: PropTypes.shape({
      vendor: PropTypes.shape({
        hasLoaded: PropTypes.bool.isRequired,
        records: PropTypes.arrayOf(
          PropTypes.shape({
            total_records: PropTypes.number.isRequired
          }),
        ),
      }),
    }),
    // react-route properties provided by withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      editStatus: false
    };

    this.editButton = this.editButton.bind(this);
    this.viewButton = this.viewButton.bind(this);
  }

  render() {
    let objData = this.props.resources.vendor.records[0].vendors[0];
    let vendor_names = _.get(objData, ['name']);
    console.log(objData);
    if(!this.state.editStatus) {
      return (
        <Row>
          <Col xs={12}>
            <Row>
            <Button onClick={this.editButton}>Edit</Button>
            <h2>Summary</h2>
            </Row>
          </Col>
          <Col xs={12}>
            <KeyValue label="Name" value={_.get(objData, ['name'])} />
          </Col>
          <Col xs={12}>
            <MultiColumnList
              virtualize
              height={150}
              id={`list-${this.props.moduleName}`}
              contentData={_.get(objData, ['vendor_names'])}
            />
          </Col>
          <Col xs={6}>
            <KeyValue label="Code" value={_.get(objData, ['code'])} />
          </Col>
          <Col xs={6}>
            <KeyValue label="Status" value={_.get(objData, ['vendor_status'])} />
          </Col>
          <Col xs={6}>
            <KeyValue label="Default Language" value={_.get(objData, ['language'])} />
          </Col>
          <Col xs={6}>
            <KeyValue label="Description" value={_.get(objData, ['description'])} />
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col xs={12}>
            <Button onClick={this.viewButton}>View</Button>
            <h2>Edit Summary</h2>
          </Col>
        </Row>
      )
    }
  }

  editButton() {
    this.setState({ editStatus: true });
  }
  viewButton() {
    this.setState({ editStatus: false });
  }
}


export default Summary;