import { useState, useEffect } from "react";

const useStravaAuth = (
  clientId: string,
  clientSecret: string,
  refreshToken: string
) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const authLink = "https://www.strava.com/oauth/token";
        const reauthResponse = await fetch(authLink, {
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

        if (!reauthResponse.ok) {
          throw new Error("Failed to reauthorize with Strava");
        }

        const reauthData = await reauthResponse.json();
        setAccessToken(reauthData.access_token);
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

    fetchAccessToken();
  }, [clientId, clientSecret, refreshToken]);

  return { accessToken, loading, error };
};

export default useStravaAuth;
