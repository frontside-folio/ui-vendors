import React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

export default class ExamplePage extends React.Component {
  render() {
    return (
      <Paneset>
        <Pane paneTitle="Pane 1" defaultWidth="20%">
          Pane 1 Content
        </Pane>
        <Pane paneTitle="Pane 2" defaultWidth="fill">
          Pane 2 Content
        </Pane>
      </Paneset>
    );
  }
}
