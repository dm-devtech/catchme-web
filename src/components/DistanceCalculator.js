import React, { Component, useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { query } from "@apollo/client";
import { QUERY_RACE } from "../graphql/queries/race";
import { UPDATE_LOCATION } from "../graphql/mutations/updateLocation";
import { QUERY_LOCATION } from "../graphql/queries/location";
import { CREATE_SCORE } from "../graphql/mutations/createScore";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://catchme-server.herokuapp.com/",
});

function computeDistance(lat1, lon1, lat2, lon2) {
  console.log(lat1, lon1, lat2, lon2);
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1609.344;
    return dist;
  }
}

export default function DistanceCalculator() {
  const location = useLocation();
  let myLocId = location.myLocId;
  const [updateLocation] = useMutation(UPDATE_LOCATION);
  const [createScore] = useMutation(CREATE_SCORE);
  const [first, setFirst] = useState(true);
  const [distance, setDistance] = useState(0);
  const [startCoor, setStartCoor] = useState({
    lat: 0,
    long: 0,
  });
  const [endCoor, setEndCoor] = useState({
    lat: 0,
    long: 0,
  });

  useEffect(() => {
    let shouldRunFirst = true;
    const timerHandler = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          let lat = parseFloat(data.coords.latitude.toFixed(5));
          let long = parseFloat(data.coords.longitude.toFixed(5));
          if (shouldRunFirst) {
            setStartCoor({ lat, long });
            setEndCoor({ lat, long });
            setFirst(false);
            shouldRunFirst = false;
          } else {
            setEndCoor({ lat, long });
          }
        },
        (error) => console.log(error),
        {
          enableHighAccuracy: true,
        }
      );
    }, 3000);
    return () => {
      clearInterval(timerHandler);
    };
  }, []);

  useEffect(() => {
    if (!first) {
      setDistance(
        distance >= location.raceDistance
          ? location.raceDistance
          : distance +
              computeDistance(
                startCoor.lat,
                startCoor.long,
                endCoor.lat,
                endCoor.long
              )
      );
      setStartCoor({ ...endCoor });
    }
  }, [first, endCoor]);

  useEffect(async () => {
    if (!first) {
      updateLocation({
        variables: {
          id: myLocId,
          startLat: startCoor.lat,
          startLong: startCoor.long,
          endLat: endCoor.lat,
          endLong: endCoor.long,
          distance,
        },
      });
      const { data: { race } = {} } = await client.query({
        query: QUERY_RACE,
        variables: { id: location.RaceId },
      });
      let userRaceTime;
      if (!race) {
        return;
      }
      const user = race.users.filter((user) => {
        return user.id === location.me;
      });
      if (distance > race.distance) {
        userRaceTime = Date.now() - race.startTime;
        createScore({
          variables: {
            time: userRaceTime,
            UserId: location.me,
          },
        });
      }
    }
  }, [first, distance]);
  return <></>;
}
