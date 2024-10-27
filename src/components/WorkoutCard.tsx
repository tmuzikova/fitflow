import React from "react";
import { StravaActivity, AthleteProfile } from "./types";
import { ActivityMap } from "./ActivityMap";

interface WorkoutCardProps {
  activity: StravaActivity;
  athlete: AthleteProfile | null;
  photos: string[];
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  activity,
  athlete,
  photos,
}) => {
  const formattedDistance = Number((activity.distance / 1000).toFixed(2));
  const formattedHours = Math.floor(activity.moving_time / 3600);
  const formattedMinutes = Math.floor((activity.moving_time % 3600) / 60);
  const formattedAvgHR = Math.round(activity.average_heartrate);

  const paceFormatter = (speedInMetersPerSecond: number): string => {
    const speedInKmH = speedInMetersPerSecond * 3.6; // Convert m/s to km/h
    const paceInMinPerKm = 60 / speedInKmH; // Calculate pace in minutes per kilometer

    const paceMinutes = Math.floor(paceInMinPerKm);
    const paceSeconds = Math.round((paceInMinPerKm - paceMinutes) * 60);

    const formattedPaceSeconds =
      paceSeconds < 10 ? `0${paceSeconds}` : paceSeconds;

    return `${paceMinutes}:${formattedPaceSeconds} min/km`;
  };

  const dateFormatter = (startTime: string): string => {
    const date = new Date(startTime); //creates a Date object from the input string

    const day = date.getDate().toString().padStart(2, "0"); // Ensure two digits
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so +1
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;

    return formattedDateTime;
  };

  return (
    <div className="bg-darkSecondary shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105 w-full rounded-lg p-10 mb-10">
      <div className="flex items-center mb-6">
        <img
          src={athlete?.profile}
          className="w-[65px] h-[65px] object-cover mr-4 rounded-full"
          alt={`${athlete?.firstname} ${athlete?.lastname}`}
        />
        <div className="text-left ">
          <p className="text-lightTertiary text-lg font-semibold">
            {athlete?.firstname} {athlete?.lastname}
          </p>
          <p className="text-lightSecondary text-sm">
            {dateFormatter(activity.start_date_local)}
          </p>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-lightTertiary text-2xl font-bold">{activity.name}</p>
      </div>
      <div>
        <p>{activity.description}</p>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col text-center">
          <p className="text-lightSecondary text-sm">Vzdálenost</p>
          <p className="text-lightTertiary text-xl font-semibold">
            {formattedDistance} km
          </p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-lightSecondary text-sm">Převýšení</p>
          <p className="text-lightTertiary text-xl font-semibold">
            {activity.total_elevation_gain} m
          </p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-lightSecondary text-sm">Čas</p>
          <p className="text-lightTertiary text-xl font-semibold">
            {formattedHours}h {formattedMinutes}m
          </p>
        </div>
      </div>

      <div className="w-[300px]">
        <div className="collapse bg-lightTertiary rounded-md">
          <input type="radio" name="my-accordion-1" defaultChecked />
          <div className="collapse-title text-xl font-semibold ">Tempo</div>
          <div className="collapse-content">
            <div className=" ">
              Průměrné tempo: {paceFormatter(activity.average_speed)}
            </div>
            <div className=" ">
              Maximální tempo: {paceFormatter(activity.max_speed)}
            </div>
          </div>
        </div>
        <div className="collapse bg-lightTertiary rounded-md mt-5">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title  text-xl font-semibold">
            Tepová frekvence
          </div>
          <div className="collapse-content">
            <div className=" ">Průměrná TF: {formattedAvgHR}</div>
            <div className=" ">Maximální TF: {activity.max_heartrate}</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-center rounded-lg overflow-hidden mb-6">
          <ActivityMap polyline={activity.map.summary_polyline} />
        </div>
        {photos.length > 0 && (
          <div className="flex justify-center mb-6">
            {photos.map((photoUrl, index) => (
              <img
                key={index}
                src={photoUrl}
                alt={`Activity photo ${index + 1}`}
                className="w-[300px] object-contain rounded-lg"
              />
            ))}
          </div>
        )}
      </div>

      <div className="text-right">
        <p className="text-lightSecondary text-sm">
          Kudos: {activity.kudos_count}
        </p>
      </div>
    </div>
  );
};
