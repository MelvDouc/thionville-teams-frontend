const API_URL = "http://localhost:8080/api/v1";
const season = 2023;
const teamId = import.meta.env.VITE_THIONVILLE_ID;

function getApiData<T>(path: `/${string}`, defaultValue: T) {
  return async (): Promise<T> => {
    try {
      const response = await fetch(API_URL + path);
      const data = await response.json() as T | null;
      return data as T;
    } catch (error) {
      return defaultValue;
    }
  };
}

export const getPlayers = getApiData<Player[]>(`/players/all?team_id=${teamId}`, []);
export const getTeams = getApiData<Team[]>(`/teams/all`, []);
export const getMatchInfo = getApiData<MatchInfo[]>(`/matches/full-info?season=${season}&team_id=${teamId}`, []);