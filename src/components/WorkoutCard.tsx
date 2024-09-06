import React from "react";

// Define the props based on the StravaActivity interface
interface WorkoutCardProps {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  start_date: string;
  start_date_local: string;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = (props) => {
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
