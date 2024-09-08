import React from "react";

import { StravaActivity } from "./types";
import { menu } from "../assets";
import { ActivityMap } from "./ActivityMap";

export const WorkoutCard: React.FC<StravaActivity> = (props) => {
  const formattedDistance = Number((props.distance / 1000).toFixed(2));
  const formattedHours = Math.floor(props.moving_time / 3600);
  const formattedMinutes = Math.floor((props.moving_time % 3600) / 60);

  return (
    <div className="bg-darkSecondary shadow-card shadow-ascent w-[500px] h-auto mt-10 rounded-md px-7 py-6">
      <div className="flex flex-row gap-4">
        <img src={menu} className="w-[50px]" />
        <div className="flex flex-col">
          <p className="text-lightTertiary font-medium text-[16px]">
            athlete name
          </p>
          <p className="text-lightSecondary font-thin text-[14px] ">
            čas | město
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-11 mt-5">
        <img src={menu} className="" />
        <p className="text-lightTertiary font-semibold text-[20px]">
          {props.name}
        </p>
      </div>
      <div className="flex flex-row ml-16 gap-3 mt-3">
        <div className="flex flex-col">
          <p className="text-lightSecondary font-thin text-[14px] ">
            Vzdálenost
          </p>
          <p className="text-lightTertiary font-semibold sm:text-[20px] text-[18px]">
            {formattedDistance} km
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-lightSecondary font-thin text-[14px] ">
            Převýšení
          </p>
          <p className="text-lightTertiary font-semibold sm:text-[20px] text-[18px]">
            {props.total_elevation_gain} m
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-lightSecondary font-thin text-[14px] ">Čas</p>
          <p className="text-lightTertiary font-semibold sm:text-[20px] text-[18px]">
            {formattedHours}h {formattedMinutes}m
          </p>
        </div>
      </div>

      <p>max rychlost</p>
      <p>rychlost</p>
      <p>bpm</p>
      <p>max bpm</p>
      <ActivityMap polyline={props.map.summary_polyline} />
      <p>kudos</p>
    </div>
  );
};
