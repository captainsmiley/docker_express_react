
import React from 'react';

import ScanResult from './ScanResult.jsx';


class NmapScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nmapc: {
        command: '',
        args: ['']
      },
      nmap_state: 'not started',
      //source :
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.source =new EventSource('/tgtest/stream/') ;
    this.handleServerEventMsg = this.handleServerEventMsg.bind(this);



  }

  handleChange(e) {
    const nmapc = this.state.nmapc;
    if(e.target.name === 'Command')
    {
      nmapc.command = e.target.value;
    }
    else if (e.target.name === 'Arg') {
      nmapc.args[0] = e.target.value;
    }
    this.setState({
      nmapc : nmapc
    });
  }
  handleServerEventMsg (e) {
    console.log(e.data);
    var v = JSON.parse(e.data);


    this.setState({
      nmap_state : v
    })
  }

  handleSubmit(e) {
    //alert('sub:' + this.state.nmapc.command +' '+ this.state.nmapc.args[0]);
    postData('/tgtest/scan/',this.state.nmapc)
    .then(data => console.log(data))
    .catch(error => console.error(error));
    e.preventDefault();
  }

  componentDidMount()
  {
    if (!!window.EventSource) {

      const source = this.source;
      source.onmessage = this.handleServerEventMsg;
/*
      source.addEventListener('message', e => {
        var v = JSON.parse(e.data);


        this.setState({
          nmap_state : v
        })

      }, false) */

      source.addEventListener('open', function(e) {
        console.log("Connected");
      }, false)

      source.addEventListener('error', function(e) {
        if (e.target.readyState == EventSource.CLOSED) {
          console.log("Disconnected");
        }
        else if (e.target.readyState == EventSource.CONNECTING) {
          console.log("Connecting...");
        }
      }, false)
    } else {
      console.log("Your browser doesn't support SSE")
    }

  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <label> Command:
      <input type="text" value={this.state.nmapc.command}
      name='Command'
      onChange={this.handleChange} />
      </label>
      <label> Arg:
      <input type="text" value={this.state.nmapc.args[0]}
      name='Arg'
      onChange={this.handleChange} />
      </label>
      <input type="submit" value="Start scan" />
      </form>

      <NmapState nmap_state={this.state.nmap_state} />
      <ScanResult ScanStatus={this.state.nmap_state} />

      </div>
    );
  }

}

function NmapState (props) {
  return (
    <div>
    <p> {props.nmap_state} </p>
    </div>
  );
}

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, same-origin, *omit
    headers: {
    //  'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //mode: 'cors', // no-cors, cors, *same-origin
    //redirect: 'follow', // *manual, follow, error
    //referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}
module.exports = NmapScanner;
