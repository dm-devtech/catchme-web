import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_RACE } from "../graphql/mutations/createRace";
import { CREATE_USER } from "../graphql/mutations/createUser";
import { useHistory } from "react-router-dom";
import UIfx from 'uifx';
import CLI from '../assets/SoundEffects/buttonClick.mp3'

export default function CreateRaceForm() {
  const [distance, setDistance] = React.useState("500");
  const [username, setUsername] = React.useState("");
  const [createRace] = useMutation(CREATE_RACE);
  const [createUser] = useMutation(CREATE_USER);
  const history = useHistory();

  function handleCreateRace(event) {
    event.preventDefault();
    createRace({
      update: (proxy, mutationResult) => {
        const raceId = mutationResult.data.createRace.id;
        createUser({
          update: (proxy, mutationResult) => {
            const userId = mutationResult.data.createUser.id;
            history.push({
              pathname: "./lobby",
              RaceId: raceId,
              me: userId,
              isHost: true,
            });
          },
          variables: { username: username, RaceId: raceId },
        });
      },
      variables: { distance: parseInt(distance) },
    });
  }

  const handleClick = () => {
    history.push("./Lobby");
  };

  const buttonClick = new UIfx(
    CLI,
    {
      volume: 0.8,
      throttleMs: 100
    }
  )

  const handleRadioChange = (event) => {
    setDistance(event.target.value);
  };

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleCreateRace}>
        <div onChange={handleRadioChange} className="form">
          <h2>Race parameters</h2>
          <label className="radio">
            <input onClick={() =>  buttonClick.play()} type="radio" value="10" name="distance" />
            <span style={{paddingLeft:"46px"}}> 10m</span>
          </label>
          <label className="radio">
            <input onClick={() =>  buttonClick.play()} type="radio" value="500" name="distance" />
            <span style={{paddingLeft:"46px"}}> 500m</span>
          </label>
          <label className="radio">
            <input onClick={() =>  buttonClick.play()} type="radio" value="1000" name="distance" />
            <span> 1000m</span>
          </label>
          <label className="radio">
            <input onClick={() =>  buttonClick.play()} type="radio" value="1500" name="distance" />
            <span> 1500m</span>
          </label>
          <label className="radio">
            <input onClick={() =>  buttonClick.play()} type="radio" value="2000" name="distance" />
            <span> 2000m</span>
          </label>
        </div>
        <div onChange={handleNameChange} className="form-input">
          <p>Enter your name: </p>
          <input type="text" defaultValue="" />
        </div>
        <input onClick={() =>  buttonClick.play()} className="form-submit" type="submit" value="Create Race" />
      </form>
    </div>
  );
}
