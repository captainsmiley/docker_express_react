
import React from 'react';
import ReactDOM from 'react-dom';

class ConsoleWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
    this.source =new EventSource('/esp_udp/stream/') ;
    this.handleServerEventMsg = this.handleServerEventMsg.bind(this);
    this.clear = this.clear.bind(this);
  }
  componentDidMount() {
    /* fetch('/tgtest/').
    then(response => response.json()).
    then(data => this.setState({list: data}));*/
    if (!!window.EventSource) {

      const source = this.source;
      source.onmessage = this.handleServerEventMsg;


      source.addEventListener('open', function(e) {
        console.log("Connected tgtest");
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
  componentWillUnmount()
  {
    this.source.close();
  }

  handleServerEventMsg (e) {
    //console.log(e.data);
    var v = this.state.text + JSON.parse(e.data)

    this.setState({
      text : v
    }
    );
    this.scrolldown();
  }

  start()
  {
    fetch('/esp_udp/start/');
  }
  stop()
  {
    fetch('/esp_udp/stop/')
  }
  scrolldown()
  {
    this.textarea.scrollTop = this.textarea.scrollHeight;
  }
  clear () {
    this.setState({
      text : ""
    });
  }

  render() {
    const divStyle = {
      border: '2px solid black',
      margin: '10px'
    };
    return (
      <div className="ConsoleWindow">
        <h1> Console Window</h1>
        <textarea readOnly="true" className="scrollabletextbox" value={this.state.text}
          ref={thistextarea => this.textarea = thistextarea}>
        </textarea>
        <Button handler={this.start} name="Start"/>
        <Button handler={this.stop} name="Stop"/>
        <Button handler={this.clear} name="Clear"/>
      </div>
    )
  }
}


function Button(props)
{
  return (
    <button onClick={props.handler}>{props.name}</button>
  )
}



module.exports = ConsoleWindow;
