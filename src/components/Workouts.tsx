import React, { useState } from "react";

import { WorkoutCard } from "./WorkoutCard";
import { SectionWrapper } from "../hoc";
import { ActivityOverview } from "./ActivityOverview";
import useStravaAuth from "./hooks/useStravaAuth";
import useFetchAthleteData from "./hooks/useFetchAthleteData";
import useFetchActivities from "./hooks/useFetchActivities";

const Workouts: React.FC = () => {
  const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_STRAVA_CLIENT_SECRET;
  const refreshToken = import.meta.env.VITE_STRAVA_REFRESH_TOKEN;
  const perPage = 5;

  // 1) Use the custom hook for authentication
  const {
    accessToken,
    loading: authLoading,
    error: authError,
  } = useStravaAuth(clientId, clientSecret, refreshToken);

  // 2) Use the custom hook to fetch athlete data and stats
  const {
    athlete,
    statsData,
    loading: athleteLoading,
    error: athleteError,
  } = useFetchAthleteData(accessToken);

  // 3) Use the custom hook to fetch activities
  const [page, setPage] = useState(1);
  const {
    activities,
    loading: activitiesLoading,
    error: activitiesError,
    hasMore,
  } = useFetchActivities(accessToken, page, perPage);

  // 4) Load more activities
  const loadMore = () => setPage((prevPage) => prevPage + 1);

  // Handle loading and error states
  if (authLoading || athleteLoading || activitiesLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="loading loading-spinner loading-lg  text-white"></div>
      </div>
    );
  }

  if (authError || athleteError || activitiesError) {
    return <div>Error: {authError || athleteError || activitiesError}</div>;
  }

  return (
    <section>
      <div className=" z-10 text-center mb-8">
        {athlete && (
          <div className="flex items-center justify-start mb-6">
            <img
              src={athlete.profile}
              alt={`${athlete.firstname} ${athlete.lastname}`}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-white text-2xl font-bold">
                {athlete.firstname} {athlete.lastname}
              </h2>
              <p className="text-white">
                {athlete.city} | {athlete.state}
              </p>
            </div>
          </div>
        )}

        <div>
          <ActivityOverview statsData={statsData} />
        </div>

        <div className="flex flex-col items-center mt-10">
          <h2 className="text-white text-4xl font-bold mb-4">Activities</h2>
          <div>
            {activities.length > 0 ? (
              <div className="flex flex-wrap justify-between">
                {activities.map((activity, index) => (
                  <WorkoutCard
                    key={activity.id - index} //strava activity id is not unique?
                    activity={activity}
                    athlete={athlete}
                    photos={
                      activity.photos?.primary?.urls["600"]
                        ? [activity.photos.primary.urls["600"]]
                        : []
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="loading loading-spinner loading-lg"></div>
            )}
          </div>
        </div>
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="bg-ascent text-white px-6 py-2 rounded-full hover:bg-ascent-dark transition-all"
            disabled={activitiesLoading}
          >
            {activitiesLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default SectionWrapper(Workouts, "workouts");
