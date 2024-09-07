import React from "react";

import { StravaActivity } from "./types";

export const WorkoutCard: React.FC<StravaActivity> = (props) => {
  return (
    <li>
      <h3>{props.name}</h3>
      <p>Distance: {props.distance} meters</p>
      <p>Time: {props.moving_time} seconds</p>
      <p>Elevation Gain: {props.total_elevation_gain} meters</p>
      {/* Add more details as needed */}
    </li>
  );
};
