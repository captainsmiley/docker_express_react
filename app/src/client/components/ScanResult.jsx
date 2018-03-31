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
    <div>
    <p>
    Port:{props.value.port+' '}
    Protocol:{props.value.protocol+' '}
    Service:{props.value.service+' '}
    Method:{props.value.method}
    </p>

    </div>
  )
}

function OpenPorts(props) {
  const oports = props.open_ports;
  //console.log(oports);
  var listOPorts = [];
  listOPorts = oports.map ((oport) =>
  <Port key={oport.port.toString()} value={oport} />);

  return (
    <div>
    <p> Open Ports </p>
    {listOPorts}
    </div>

  );
}

module.exports = ScanResult;
