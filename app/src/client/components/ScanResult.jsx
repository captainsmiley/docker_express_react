import React from 'react';

class ScanResult extends React.Component {
  constructor(props) {
    super(props);
//    this.state = {scan_data: []};
  }
  render() {
    const show = this.props.ScanStatus === 'Scan complete' ?
    <ScanData/>
    :
    <p> No results yet. </p>
    return (
      <div>
      {show}
      </div>
    )
  }
}

class ScanData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {scan_data: []};
  }

  componentDidMount() {

    fetch('/tgtest/scan_result/').
    then(response => response.json()).
    then(data => this.setState({scan_data: data}));
    
  }
  render() {
    var ips = [];
    if (this.state.scan_data !== null)
    {
       ips = this.state.scan_data.map((host) => (
      <div key={host.ip}>
      <h1> {host.ip} </h1>
      <OpenPorts open_ports={host.openPorts} />
      </div>
    ));
    }
    return (
      <div>
      {ips}
      </div>);
  }
}

function Port(props)  {
  return (//[{"port":80,"protocol":"tcp","service":"http","method":"table"}]
  <tr>
  <td>{props.value.port}</td>
  <td>{props.value.protocol}</td>
  <td>{props.value.service}</td>
  <td>{props.value.method}</td>
  </tr>
  )
}

function PortTabel(props) {
  return (
    <table>
      <tbody>
      <PortTabelHeadings />
      {props.ports}
      </tbody>
    </table>
  )
}

function PortTabelHeadings(props) {
  return (
    <tr>
      <th>Port</th>
      <th>Protocol</th>
      <th>Service</th>
      <th>Method</th>
    </tr>

  )
}

function OpenPorts(props) {
  const oports = props.open_ports;
  //console.log(oports);
  var listOPorts = [];
  Array.isArray(oports) ?
  listOPorts = oports.map ((oport) =>
  <Port key={oport.port.toString()} value={oport} />)
  :
  listOPorts = [];
  //listOPorts.push(<p key={'isnull'}> No open ports </p>);

  return (
    <div>
    <p> Open Ports </p>
    <PortTabel ports={listOPorts} />
    </div>
  );
}

module.exports = ScanResult;
