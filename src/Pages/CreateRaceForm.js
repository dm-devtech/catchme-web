import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_RACE } from '../graphql/mutations/createRace';
import { CREATE_USER } from '../graphql/mutations/createUser';
import { useHistory } from "react-router-dom"

export default function CreateRaceForm() {
  const [distance, setDistance] = React.useState("500");
  const [username, setUsername] = React.useState("");
  const [createRace, { loading, error }] = useMutation(CREATE_RACE);
  const [createUser, { loadingUser, userError }] = useMutation(CREATE_USER);
  const history = useHistory();

  function handleCreateRace(event) {
    event.preventDefault();
    createRace({
      update: (proxy, mutationResult) => {
        // dont delete this comment!
        // console.log('raceMutationResult: ', mutationResult);
        const raceId = mutationResult.data.createRace.id;

        createUser({
          update: (proxy, mutationResult) => {
            const userId = mutationResult.data.createUser.id;
            history.push({
              pathname: './lobby',
              RaceId: raceId,
              me: userId,
            })
          },
          variables: { username: username, RaceId: raceId  }
        });
      },
      variables: { distance: parseInt(distance) }
    });
  }

  const handleRadioChange = (event) => {
    setDistance(event.target.value);
  };

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <form onSubmit={handleCreateRace}>
      <div onChange={handleRadioChange}>
        <input type="radio" value="500" name="distance"/> 500m
        <input type="radio" value="1000" name="distance"/> 1000m
      </div>
      <div onChange={handleNameChange}>
        <input type="text" defaultValue=""/>
      </div>
      <input type="submit" value="Create Race"/>
    </form>
  );
}
