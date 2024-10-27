import React from "react";

import { StatsData } from "./types";
import BarChart from "./BarChart";

interface ActivityOverviewProps {
  statsData: StatsData | null;
}

export const ActivityOverview: React.FC<ActivityOverviewProps> = ({
  statsData,
}) => {
  const labels = ["Running", "Swimming", "Cycling"];
  const alltime_data = [
    statsData?.all_run_totals?.distance || 0,
    statsData?.all_swim_totals?.distance || 0,
    statsData?.all_ride_totals?.distance || 0,
  ];
  const ytd_data = [
    statsData?.ytd_run_totals?.distance || 0,
    statsData?.ytd_swim_totals?.distance || 0,
    statsData?.ytd_ride_totals?.distance || 0,
  ];
  const month_data = [
    statsData?.recent_run_totals?.distance || 0,
    statsData?.recent_swim_totals?.distance || 0,
    statsData?.recent_ride_totals?.distance || 0,
  ];

  return (
    <div className="bg-lightSecondary rounded-md p-10 text-darkSecondary">
      {statsData ? (
        <div className=" mb-8">
          <h3 className="text-2xl font-bold mb-4">Activities Overview</h3>
          <BarChart
            labels={labels}
            alltime_data={alltime_data}
            ytd_data={ytd_data}
            month_data={month_data}
          />
        </div>
      ) : (
        <p>No overview data available</p>
      )}
    </div>
  );
};
