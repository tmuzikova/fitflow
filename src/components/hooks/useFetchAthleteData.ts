import { useState, useEffect } from "react";
import { AthleteProfile, StatsData } from "../types";

const useFetchAthleteData = (accessToken: string | null) => {
  const [athlete, setAthlete] = useState<AthleteProfile | null>(null);
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchAthleteData = async () => {
      try {
        const athleteLink = `https://www.strava.com/api/v3/athlete?access_token=${accessToken}`;
        const athleteResponse = await fetch(athleteLink);

        if (!athleteResponse.ok) {
          throw new Error("Failed to fetch athlete data from Strava");
        }

        const athleteData = await athleteResponse.json();
        setAthlete(athleteData);

        const statsLink = `https://www.strava.com/api/v3/athletes/${athleteData.id}/stats?access_token=${accessToken}`;
        const statsResponse = await fetch(statsLink);

        if (!statsResponse.ok) {
          throw new Error("Failed to fetch athlete stats data from Strava");
        }

        const statsData = await statsResponse.json();
        setStatsData(statsData);
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

    fetchAthleteData();
  }, [accessToken]);

  return { athlete, statsData, loading, error };
};

export default useFetchAthleteData;
