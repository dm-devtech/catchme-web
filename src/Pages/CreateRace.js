import React, { Component } from 'react';
import CreateRaceForm from './CreateRaceForm';
import Header from './Header';
import logo from '../images/logo.gif'

export default class CreateRace extends Component {
  render() {
    return (
      <div className="main-content">
        <Header/>
          <div className="lobby-creation">
            <p>Race parameters</p>
          </div>
        <CreateRaceForm />
      </div>
    )
  }
}