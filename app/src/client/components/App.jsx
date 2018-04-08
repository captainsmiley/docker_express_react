import React from 'react';
import ReactDOM from 'react-dom';
import NmapScanner from './NmapScanner.jsx'
import Tgtest from './Tgtest.jsx'

import NavBar from './NavBar.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list: []};
  }
  componentDidMount() {
    /* fetch('/tgtest/').
    then(response => response.json()).
    then(data => this.setState({list: data}));*/
  }

  render() {
    return (
      <div>
      <NmapScanner/>
      </div>

    )
  }
}

module.exports = App;
