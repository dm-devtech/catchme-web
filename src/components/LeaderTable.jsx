import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useQuery } from "@apollo/react-hooks";
import { SCORES_QUERY } from "../graphql/queries/scores";
import { useState, useEffect } from "react";

const FormDistRaces = ({ scores, search }) => {
  if (scores) {
    const distRaces = [];
    for (let i = 0; i < scores.length; i++) {
      distRaces.push(scores[i].user.race.distance);
    }
    function uniqueDistanceValue(value, index, self) {
      return self.indexOf(value) === index;
    }
    const distII = distRaces.filter(uniqueDistanceValue);
    console.log(distII);
    return distII.map((availscores) => (
      <div key={availscores}>
        <label>
          {availscores}
          <input
            onClick={() => search(availscores)}
            type="radio"
            value={availscores}
            name="distance"
          />
          <span style={{ paddingLeft: "46px" }}> </span>
        </label>
      </div>
    ));
  } else {
    return null;
  }
};

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 10),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds + "." + milliseconds;
}
const border = {
  borderColor: "white",
  marginBottom: "20px",
};

export default function LeaderTable() {
  const [table, setTable] = useState([]);
  const { data: { scores } = { scores: [] } } = useQuery(SCORES_QUERY);

  function search(input) {
    console.log(input);
    let ditanceFiltered = scores.filter(
      (distRace) => distRace.user.race.distance === input
    );
    setTable(ditanceFiltered.sort((a, b) => (a.time < b.time ? -1 : 1)));
  }

  useEffect(() => {
    setTable(scores.sort((a, b) => (a.time < b.time ? -1 : 1)));
  }, [scores]);

  return (
    <div>
      <FormDistRaces scores={scores} search={search} />
      <Table>
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>User</Th>
            <Th>Race Distance</Th>
            <Th>Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {table.map((score, index) => (
            <Tr style={border} key={score.id}>
              <Td>{index + 1}</Td>
              <Td>{score.user.username}</Td>
              <Td>{score.user.race.distance}</Td>
              <Td>{msToTime(score.time)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
