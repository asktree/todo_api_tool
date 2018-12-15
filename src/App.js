import React, { Component } from 'react';
import ReactJson from 'react-json-view';
var X2JS = require('x2js');
var x2js = new X2JS();

var opmlstr = 
`<?xml version="1.0" encoding="utf-8"?>
<opml version="2.0">
  <head>
    <title></title>
    <flavor>dynalist</flavor>
    <source>https://dynalist.io</source>
    <ownerName>Agrippa Kellum</ownerName>
    <ownerEmail>agrippakellum@gmail.com</ownerEmail>
  </head>
  <body>
    <outline text="test">
      <outline text="baking | reward: 400">
        <outline text="get flour | cost: 100"/>
        <outline text="get water | cost: 30"/>
      </outline>
      <outline text="website | reward: 300">
        <outline text="get internet | cost: 100"/>
        <outline text="get house | cost: 100"/>
      </outline>
    </outline>
  </body>
</opml>`;

var honk = x2js.xml2js(opmlstr);

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactJson src={honk} />
      </div>
    );
  }
}

export default App;
