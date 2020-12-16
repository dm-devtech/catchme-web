import React, { Component, useState, useEffect } from "react";
import Header2 from '../components/Header2';
import Map from "../components/Map";
import  Footer from '../components/Footer';
import StopwatchAutoStart from '../components/StopwatchAutoStart';


function Race() {
  return (
    <div className="main-content">
      <Header2/>
        <div className="race-details">
        <StopwatchAutoStart/>
          <Map />
        </div>
      <Footer />
    </div>
  );
}

export default Race;
