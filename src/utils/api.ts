const API_URL = "http://localhost:8080/api/v1";
const teamId = import.meta.env.VITE_THIONVILLE_ID;
export const season = 2023;

export const urls = {
  PLAYERS: "/players/all",
  MATCHES: "/matches/all",
  TEAMS: "/teams/all",
  BOARD_INFO: "/board-info/all"
} as const;

export async function getApiData<T>(path: `/${string}`, defaultValue: T) {
  try {
    const response = await fetch(API_URL + path);
    const data = await response.json() as T | null;
    return data as T;
  } catch (error) {
    return defaultValue;
  }
}

export const getPlayers = () => {
  return getApiData<Player[]>(`${urls.PLAYERS}?team_id=${teamId}`, []);
};

export const getTeams = () => {
  return getApiData<Team[]>(urls.TEAMS, []);
};

export const getMatches = () => {
  return getApiData<Match[]>(`${urls.MATCHES}?season=${season}&team_id=${teamId}`, []);
};