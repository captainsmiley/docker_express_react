import React from 'react';
import ReactDOM from 'react-dom';
import NmapScanner from './NmapScanner.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list: []};
  }
  componentDidMount() {
    fetch('/tgtest/').
    then(response => response.json()).
    then(data => this.setState({list: data}));
  }

  render() {
    const items = this.state.list.map((item) => (
      <div key={item.name}>
      <h1> {item.name} </h1>
      </div>
    ));
    return (
      <NmapScanner/>

    )
  }
}

module.exports = App;
