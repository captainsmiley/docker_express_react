
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
    const div2Style = {
      border: '2px solid black'
    };
    return (
      <div className="container" style={div2Style}>
  <div className="row">
    <div className="col-sm" style={divStyle}>
      One of three columns
    </div>
    <div className="col-sm">
      <button type="button" class="btn btn-primary" >Danger!</button>
    </div>
    <div className="col-sm">
      One of three columns
    </div>
  </div>
</div>
    )
  }
}

module.exports = Tgtest;
