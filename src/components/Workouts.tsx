import React, { useEffect, useState } from "react";

import { WorkoutCard } from "./WorkoutCard";
import { StravaActivity } from "./types";
import { SectionWrapper } from "../hoc";

const Workouts: React.FC = () => {
  const [activities, setActivities] = useState<StravaActivity[]>([]);

  const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_STRAVA_CLIENT_SECRET;
  const refreshToken = import.meta.env.VITE_STRAVA_REFRESH_TOKEN;

  useEffect(() => {
    //REAUTHORIZING -> NEED TO GET A NEW ACCESS TOKEN
    //access token = short-lived, expires after a few hours for safety reasons, needed for API calls
    //refresh token = long-lived, used to request  a new access token from the authorization server
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

    //FETCHING ACTIVITIES (info: https://developers.strava.com/docs/reference/#api-Activities-getLoggedInAthleteActivities)
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
  }, []);

  console.log(activities[1]);

  return (
    <div>
      <h2>Workouts</h2>
      {activities.length > 0 ? (
        <div className="flex flex-wrap justify-between">
          {activities.map((activity) => (
            <WorkoutCard key={activity.id} {...activity} />
          ))}
        </div>
      ) : (
        <span className="loading loading-spinner loading-lg"></span>
      )}
    </div>
  );
};

export default SectionWrapper(Workouts, "workouts");
