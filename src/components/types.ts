export interface MapDetails {
  id: string;
  summary_polyline: string | null;
  resource_state: number;
}

export interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  sport_type: string;
  start_date_local: string;
  average_heartrate: number;
  max_heartrate: number;
  kudos_count: number;
  average_speed: number;
  max_speed: number;
  map: MapDetails;
}
