import React, { Component } from 'react';
import map from '../images/runmap.gif';


export default class Race extends Component {
  render() {
    return (
      <div className="main-content">
        <div className="race">
          <h1>CatchMe</h1>
          <img src={map} alt="Map" />
          <h4>Race Details:</h4>
          <p>David</p>
          <p>Time: 8min 25sec</p>
          <p>Distance: 1000m</p>
        </div>
      </div>
    )
  }
}