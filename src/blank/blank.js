import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Field } from "redux-form";

import Route from "react-router-dom/Route";
import { withRouter } from "react-router";
import queryString from "query-string";
import transitionToParams from "@folio/stripes-components/util/transitionToParams";
import Paneset from "@folio/stripes-components/lib/Paneset";
import Pane from "@folio/stripes-components/lib/Pane";
import { Row, Col } from "@folio/stripes-components/lib/LayoutGrid";
import KeyValue from "@folio/stripes-components/lib/KeyValue";
import MultiColumnList from "@folio/stripes-components/lib/MultiColumnList";
import Button from "@folio/stripes-components/lib/Button";
import stripesForm from "@folio/stripes-form";

export default class Application extends React.Component {
  render() {
    return (
      <div>
        <h2 id="demo-message">This is add new vendor</h2>
      </div>
    );
  }
}
