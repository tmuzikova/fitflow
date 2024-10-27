import { useState, useEffect } from "react";
import { StravaActivity } from "../types";

const useFetchActivities = (
  accessToken: string | null,
  page: number,
  perPage: number
) => {
  const [activities, setActivities] = useState<StravaActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchActivityDetails = async (
    activityId: number
  ): Promise<StravaActivity> => {
    const activityDetailLink = `https://www.strava.com/api/v3/activities/${activityId}`;
    const activityDetailResponse = await fetch(activityDetailLink, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!activityDetailResponse.ok) {
      console.error("Failed to fetch detailed activity", activityId);
      throw new Error("Failed to fetch detailed activity");
    }

    const activityDetailData: StravaActivity =
      await activityDetailResponse.json();

    return activityDetailData;
  };

  useEffect(() => {
    if (!accessToken) return;

    const fetchActivities = async () => {
      setLoading(true);

      try {
        const activitiesLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&page=${page}&per_page=${perPage}`;
        const activitiesResponse = await fetch(activitiesLink);

        if (!activitiesResponse.ok) {
          throw new Error("Failed to fetch activities from Strava");
        }

        const activitiesData: StravaActivity[] =
          await activitiesResponse.json();

        // Fetch detailed activity information, including photos, for each activity
        const detailedActivities = await Promise.all(
          activitiesData.map(async (activity) => {
            const detailedActivity = await fetchActivityDetails(activity.id);
            return detailedActivity;
          })
        );

        if (activitiesData.length < perPage) {
          setHasMore(false); // No more activities to load
        }

        setActivities((prevActivities) => [
          ...prevActivities,
          ...detailedActivities,
        ]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [accessToken, page, perPage]);

  return { activities, loading, error, hasMore };
};

export default useFetchActivities;
