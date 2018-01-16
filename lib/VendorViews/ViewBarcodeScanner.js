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
// QR Code 
import QRCode from 'qrcode.react';
// Firebase 
import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCpkDnAjhMZaSU2JLkRKAIRLAUBY-OHdzM",
  authDomain: "folioscanner-c9a17.firebaseapp.com",
  databaseURL: "https://folioscanner-c9a17.firebaseio.com",
  projectId: "folioscanner-c9a17",
  storageBucket: "folioscanner-c9a17.appspot.com",
  messagingSenderId: "1043482018053"
};
firebase.initializeApp(config)

class ViewBarcodeScanner extends React.Component {
  static propTypes = {
    onCloseDetails: PropTypes.func.isRequired,
    onScanItem: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      itemData: {},
      firebase_status: false,
      firebase_key: ''
    }
    this.onScan = this.onScan.bind(this);
    this.loopData = this.loopData.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
  }

  componentWillMount() {
    var ref = firebase.database().ref('sessions');
    ref.on('value', function (snapshot) {
      var arr = [];
      snapshot.forEach(function (childSnapshot) {
        var obj = _.assign({ key: childSnapshot.key }, childSnapshot.val())
        arr.push(obj)
      });
      this.setState({ itemData: arr });
    }.bind(this));

    ref.on('child_changed', function (data) {
      if(data.val().state !== 'disconnected') {
        if (data.val().data) {
          if(data.val().data.trim().length > 0) {
            this.props.onScanItem(data.val().data);
          }
        }
      }
    }.bind(this));
  }

  render() {
    // console.log(this.props);
    const lastMenu = (<PaneMenu>
      <button id="edit-vendor" onClick={this.onScan} title="Scan"><Icon icon="edit" />Scan</button>
    </PaneMenu>);
    const itemDataStatus = _.isEmpty(this.state.itemData) === false ? true : false; 
    return (
      <Pane paneTitle="Link Scanner" defaultWidth="50%" dismissible={true} onClose={this.props.onCloseDetails}>
        <div style={{width: '100%'}}>
          <Button id="connect-scanner" onClick={() => { this.onScan('new') }} title="Scan">Generate new QR Code</Button>
          <br /><br /><br />
        </div>
        {this.state.firebase_status &&
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <QRCode value={this.state.firebase_key} />
          <p style={{ fontSize: '12px', marginBottom: '10px' }}>{this.state.firebase_key}</p>
          </div>
        }
        {itemDataStatus &&
          <div style={{ width: '100%' }}>
            {this.state.itemData.map(this.loopData)}
          </div>
        }
      </Pane>
    )
  }

  onScan(currID) {
    var today = new Date();
    var obj = { today: today}
    if (currID == 'new') {
      var firebaseDatabase = firebase.database();
      var newPostKey = firebaseDatabase.ref().child('sessions').push().key;
      this.setState({ firebase_status: true, firebase_key: newPostKey });
    } else {
      var newPostKey = currID;
      this.setState({ firebase_status: true, firebase_key: newPostKey });
    }
  }

  loopData(val, key) {
    var id = _.get(val, 'key');
    var currentState = _.get(val, 'state', '') === 'disconnected' ? false : true;
    let button = null;
    if(currentState) {
      button = <Button onClick={() => { this.onDisconnect(id) }} buttonStyle="error">Disconnect</Button>
    } else {
      button = <Button onClick={() => { this.onScan(id) }} buttonStyle="primary">Re-connect</Button>
    }

    return(
      <Row key={key}>
        <Col xs={4}>
          <KeyValue label="Key" value={_.get(val, 'key', '')} /> 
        </Col>
        <Col xs={3}>
          <KeyValue label="Device Name" value={_.get(val, 'deviceName', '')} /> 
        </Col>
        <Col xs={3}>
          <KeyValue label="State" value={_.get(val, 'state', '')} /> 
        </Col>
        <Col xs={2}>
          {button}
        </Col>
        <Col xs={12}>
          <KeyValue label="Data" value={_.get(val, 'data', '')} />
        </Col>
        <hr />
      </Row>
    )
  }

  onDisconnect(key) {
    console.log(key)
    var firebaseDatabase = firebase.database();
    firebaseDatabase.ref('sessions/' + key).update({ 'state': 'disconnected' });
  }
}

export default ViewBarcodeScanner;