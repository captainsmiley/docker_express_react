"use strict";

module.exports = class Esp {
  constructor() {
    this.id = null;
    this.lastTimeInfo = 0;
    this.udp_json_buff = "";
    this.udp_json_opend_count = 0;

  }

  ParseJson(json)
  {
    var tmp = JSON.parse(json);
    if (typeof tmp.Time !== "undefined") {
      this.lastTimeInfo = tmp.Time;
      console.log(tmp.Time);
    }
    if (typeof tmp.Heap !== "undefined") {
    }


  }
  UdpRecived(msg)
  {
    var text = ""
    for (var i=0; i<msg.length; i++)
    {
      if(msg.charAt(i) == "{")
      {
        this.udp_json_opend_count++;
      }
      /*in json mode add to json buff*/
      if(this.udp_json_opend_count === 0)
      {
        text+=msg.charAt(i);
      }
      else if (this.udp_json_opend_count > 0) {
        this.udp_json_buff += msg.charAt(i);
      }
      if(msg.charAt(i) == "}")
      {
        this.udp_json_opend_count--;
        if (this.udp_json_opend_count === 0)
        {
          this.ParseJson(this.udp_json_buff)
          this.udp_json_buff = "";
        }
      }

    }
    return text;

  }
}
