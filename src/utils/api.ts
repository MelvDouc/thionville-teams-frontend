const API_URL = "http://localhost:8080/api/v1";
const teamId = import.meta.env.VITE_THIONVILLE_ID;
const season = 2023;

const API_PATHS = {
  PLAYERS: "/players/all",
  MATCHES: "/matches/all",
  TEAMS: "/teams/all",
  BOARD_INFO: "/board-info/all"
} as const;

async function getApiData<T>(path: `/${string}`, defaultValue: T) {
  try {
    const response = await fetch(API_URL + path);
    const data = await response.json() as T | null;
    return data as T;
  } catch (error) {
    return defaultValue;
  }
}

export const getPlayers = () => {
  return getApiData<Player[]>(`${API_PATHS.PLAYERS}?team_id=${teamId}`, []);
};

export const getTeams = () => {
  return getApiData<Team[]>(API_PATHS.TEAMS, []);
};

export const getMatches = () => {
  return getApiData<Match[]>(`${API_PATHS.MATCHES}?season=${season}&team_id=${teamId}`, []);
};

export const getBoardInfoList = ({ season, round }: {
  season: string | number;
  round: string | number;
}) => {
  return getApiData(`${API_PATHS.BOARD_INFO}?season=${season}&round=${round}`, [] as BoardInfo[]);
};