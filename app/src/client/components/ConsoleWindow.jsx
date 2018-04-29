
import React from 'react';
import ReactDOM from 'react-dom';

class ConsoleWindow extends React.Component {
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
      <div className="ConsoleWindow">
        <h1> Console Window</h1>
        <textarea readonly="true" class="scrollabletextbox">
        {this.props.text}
        </textarea>
      </div>
    )
  }
}

module.exports = ConsoleWindow;
