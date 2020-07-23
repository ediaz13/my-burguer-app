import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurguerBuilder from './containers/BurgerBuilder/BurguerBuilder';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <BurguerBuilder></BurguerBuilder>
          <p>Hello world!</p>
        </Layout>
      </div>
    );
  }
}

export default App;
