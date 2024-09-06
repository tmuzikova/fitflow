import React, { useEffect, useState } from "react";
import { WorkoutCard } from "./WorkoutCard";

// Define the structure of a Strava activity based on Strava's API
interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  start_date: string;
  start_date_local: string;
  // Add other relevant fields if needed
}

export const Workouts: React.FC = () => {
  const [activities, setActivities] = useState<StravaActivity[]>([]);

  const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_STRAVA_CLIENT_SECRET;
  const refreshToken = import.meta.env.VITE_STRAVA_REFRESH_TOKEN;

  useEffect(() => {
    const reAuthorize = async (): Promise<void> => {
      const authLink = "https://www.strava.com/oauth/token";
      const reauth_response = await fetch(authLink, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
      });

      if (!reauth_response.ok) {
        throw new Error("Failed to reauthorize with Strava");
      }

      const reauth_data: { access_token: string } =
        await reauth_response.json();
      getActivities(reauth_data.access_token);
    };

    const getActivities = async (access_token: string): Promise<void> => {
      const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`;
      const activities_response = await fetch(activities_link);

      if (!activities_response.ok) {
        throw new Error("Failed to fetch activities from Strava");
      }

      const activities_data: StravaActivity[] =
        await activities_response.json();
      setActivities(activities_data);
    };

    reAuthorize();
  });

  return (
    <div>
      <h2>Workouts</h2>
      {activities.length > 0 ? (
        <ul>
          {activities.map((activity) => (
            <WorkoutCard key={activity.id} {...activity} />
          ))}
        </ul>
      ) : (
        <p>No workouts available</p>
      )}
    </div>
  );
};