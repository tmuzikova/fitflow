import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      VITE_STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
      VITE_STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
      VITE_STRAVA_ACCESS_TOKEN: process.env.STRAVA_ACCESS_TOKEN,
    },
  },
});
