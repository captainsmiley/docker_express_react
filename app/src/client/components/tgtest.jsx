
import React from 'react';
import ReactDOM from 'react-dom';

class Tgtest extends React.Component {
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
    const divStyle = {
      border: '2px solid black',
      margin: '10px'
    };
    return (
      <div className="Tgtest">
      </div>
    )
  }
}

module.exports = Tgtest;
