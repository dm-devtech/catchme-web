import React, { Component } from "react";
import Header from "../components/Header";
import LeaderTable from "../components/LeaderTable";
import Footer from "../components/Footer";

export default class Leaderboard extends Component {
  render() {
    return (
      <div className="main-content">
        <Header />
        <div className="race-end">
          <h1>Leaderboard</h1>
          <h3>Filter by Distance:</h3>
          <LeaderTable />
        </div>
        <Footer />
      </div>
    );
  }
}
