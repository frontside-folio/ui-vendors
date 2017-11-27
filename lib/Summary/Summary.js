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
    var objData = this.props.resources.vendor.records[0].vendors[0];
    console.log(objData);
    // <KeyValue label="Relationship Status" value={_.get(record, ['meta', 'status'], '-')} />
    if(!this.state.editStatus) {
      return (
        <Row>
          <Col xs={12}>
            <Button onClick={this.editButton}>Edit</Button>
          </Col>
          <Col xs={12}>
            
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col xs={12}>
            <Button onClick={this.viewButton}>View</Button>
            <h2>Edit summary</h2>
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