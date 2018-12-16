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

const parse_cost = str => {
  var n1 = str.indexOf("| cost: ") + 8;
  if (n1 == -1) {throw "'| cost: ' not found in task string";}
  var n2 = str.slice(n1).indexOf("|")
  if (n2 == -1) {n2 = str.length;}
  var cost = str.substring(n1,n2);
  var cost = parseFloat(cost);
  return cost;
}

const parse_reward = str => {
  var n1 = str.indexOf("| reward: ") + 10;
  if (n1 == -1) {throw "'| reward: ' not found in task string";}
  var n2 = str.slice(n1).indexOf("|")
  if (n2 == -1) {n2 = str.length;}
  var cost = str.substring(n1,n2);
  var cost = parseFloat(cost);
  return cost;
}

const convert2api = dat => {
  let newDat = JSON.parse(JSON.stringify(dat));
  var goals = newDat["opml"]["body"]["outline"]["outline"];
  console.log(goals);
  for (var goal of goals.entries()) {
    console.log(goal)
    var reward = parse_reward(goal[1]["_text"]);
    console.log(reward)
    var total_costs = 0
    for (let task of goal[1]["outline"].entries()){
      console.log(task);
      console.log(task[1]["_text"])
      total_costs += parse_cost(task[1]["_text"])
      console.log(total_costs)
    }
    for (let task of goal[1]["outline"].entries()){
      let portion = parse_cost(task[1]["_text"]) / total_costs;
      let task_reward = reward * portion;
      goals[goal[0]]["outline"][task[0]]["_text"] += " | reward: " + task_reward.toString();
    }
  }
  return newDat;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactJson src={convert2api(honk)} />
      </div>
    );
  }
}

export default App;
