import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Application from './routes/application';
import ExamplePage from './routes/example-page';
import HomePage from './routes/homepage';
import Settings from './routes/settings';

class Vendors extends Component {
  // static actionNames = ['stripesHome', 'usersSortByName'];
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
  }


  render() {
    if (this.props.showSettings) {
      return <Settings {...this.props} />;
    }
    // <Route path={`${this.props.match.path}`} component={Application} />
    // <ul>
    //   <li><Link to={`${this.props.match.path}/home`}>[home]</Link></li>
    //   <li><Link to={`${this.props.match.path}/examples`}>[examples]</Link></li>
    // </ul>
    return (
      <div>
        <Switch>
          <Route path={`${this.props.match.path}/`} component={HomePage} />
          <Route path={`${this.props.match.path}/examples`} exact component={ExamplePage} />
        </Switch>
      </div>
    );
  }
}

export default Vendors;
