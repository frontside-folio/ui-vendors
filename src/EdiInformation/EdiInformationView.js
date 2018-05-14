import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import css from './EdiInformationView.css';

class EdiInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues !== null ? initialValues.edi : false;
    if (dataVal) {
      return (
        <div className={css.horizontalLine}>
          {dataVal &&
            <Row>
              <Col xs={12}>
                <h4 className={css.title}>EDI Basic</h4>
              </Col>
              <Col xs={3}>
                <KeyValue label="Vendor EDI Code" value={_.get(dataVal, ['vendor_edi_code'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Vendor EDI Type" value={_.get(dataVal, ['vendor_edi_type'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Library EDI Code" value={_.get(dataVal, ['lib_edi_code'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Library EDI Type" value={_.get(dataVal, ['lib_edi_type'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Prorate Tax" value={_.toString(_.get(dataVal, ['prorate_tax']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Prorate Fees" value={_.toString(_.get(dataVal, ['prorate_fees']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="EDI Naming Convention" value={_.get(dataVal, ['edi_naming_convention'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Send Account Number" value={_.toString(_.get(dataVal, ['send_acct_num']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Support Order" value={_.toString(_.get(dataVal, ['support_order']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Support Invoice" value={_.toString(_.get(dataVal, ['support_invoice']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Notes" value={_.get(dataVal, ['notes'], '')} />
              </Col>
              <Col xs={12}>
                <hr />
              </Col>
            </Row>
          }
          {dataVal &&
            <Row>
              <Col xs={12}>
                <h4 className={css.title}>FTP Details</h4>
              </Col>
              <Col xs={3}>
                <KeyValue label="EDI FTP" value={_.get(dataVal, ['edi_ftp.ftp_format'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Server Address" value={_.get(dataVal, ['edi_ftp.server_address'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Username" value={_.get(dataVal, ['edi_ftp.username'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Password" value={_.get(dataVal, ['edi_ftp.password'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="FTP Mode" value={_.get(dataVal, ['edi_ftp.ftp_mode'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="FTP Connection Mode" value={_.get(dataVal, ['edi_ftp.ftp_conn_mode'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="FTP Port" value={_.toString(_.get(dataVal, ['edi_ftp.ftp_port']))} />
              </Col>
              <Col xs={6}>
                <KeyValue label="Order Directory" value={_.get(dataVal, ['edi_ftp.order_directory'])} />
              </Col>
              <Col xs={6}>
                <KeyValue label="Invoice Directory" value={_.get(dataVal, ['edi_ftp.invoice_directory'])} />
              </Col>
              <Col xs={12}>
                <KeyValue label="Notes" value={_.get(dataVal, ['edi_ftp.notes'])} />
              </Col>
              <Col xs={12}>
                <hr />
              </Col>
            </Row>
          }
          {dataVal &&
            <Row>
              <Col xs={12}>
                <h4 className={css.title}>FTP Details</h4>
              </Col>
              <Col xs={3}>
                <KeyValue label="Schedule EDI" value={_.toString(_.get(dataVal, ['edi_job.schedule_edi']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Date" value={_.get(dataVal, ['edi_job.date'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Time" value={_.get(dataVal, ['edi_job.time'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Monday" value={_.toString(_.get(dataVal, ['edi_job.is_monday']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Tuesday" value={_.toString(_.get(dataVal, ['edi_job.is_tuesday']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Wednesday" value={_.toString(_.get(dataVal, ['edi_job.is_wednesday']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Thursday" value={_.toString(_.get(dataVal, ['edi_job.is_thursday']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Friday" value={_.toString(_.get(dataVal, ['edi_job.is_friday']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Saturday" value={_.toString(_.get(dataVal, ['edi_job.is_saturday']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Sunday" value={_.toString(_.get(dataVal, ['edi_job.is_sunday']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Send to Emails" value={_.get(dataVal, ['edi_job.send_to_emails'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Notify All EDI" value={_.toString(_.get(dataVal, ['edi_job.notify_all_edi']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Notify Invoice Only" value={_.toString(_.get(dataVal, ['edi_job.notify_invoice_only']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Notify Error Only" value={_.toString(_.get(dataVal, ['edi_job.notify_error_only']))} />
              </Col>
            </Row>
          }
        </div>
      );
    } else {
      return (
        <div>
          <p>-- No Edi information available --</p>
          <br />
        </div>
      );
    }
  }
}

export default EdiInformationView;
