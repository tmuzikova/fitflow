export interface MapDetails {
  id: string;
  summary_polyline: string | null;
  resource_state: number;
}

interface PhotoUrls {
  "100": string;
  "600": string;
}

interface PrimaryPhoto {
  id: string | null;
  unique_id: string;
  urls: PhotoUrls;
  source: number;
}

interface PhotosSummary {
  primary: PrimaryPhoto;
  count: number;
}

//activities data are from: https://developers.strava.com/docs/reference/#api-Activities-getLoggedInAthleteActivities
//photos&description data are from: https://developers.strava.com/docs/reference/#api-Activities-getActivityById
export interface StravaActivity {
  id: number;
  name: string;
  location_city: string;
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
  photos: PhotosSummary;
  description: string;
}

export interface AthleteProfile {
  id: number;
  firstname: string;
  lastname: string;
  profile: string; // URL to the profile picture
  city: string;
  state: string;
}

export interface ActivityTotals {
  distance: number;
  achievement_count: number;
  count: number;
  elapsed_time: number;
  elevation_gain: number;
  moving_time: number;
}

export interface StatsData {
  recent_run_totals: ActivityTotals | null;
  all_run_totals: ActivityTotals | null;
  recent_swim_totals: ActivityTotals | null;
  biggest_ride_distance: number | null;
  ytd_swim_totals: ActivityTotals | null;
  all_swim_totals: ActivityTotals | null;
  recent_ride_totals: ActivityTotals | null;
  biggest_climb_elevation_gain: number | null;
  ytd_ride_totals: ActivityTotals | null;
  all_ride_totals: ActivityTotals | null;
  ytd_run_totals: ActivityTotals | null;
}

export interface WorkoutCardProps {
  activity: StravaActivity;
  athlete: AthleteProfile | null;
  photos: string[]; // Array of photo URLs
}

export interface Photo {
  id: number;
  unique_id: string;
  urls: {
    [key: string]: string;
  };
}
