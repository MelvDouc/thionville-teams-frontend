const API_URL = "http://localhost:8080/api/v1";
const season = 2022;
const teamId = 1154;

async function getApiData<T>(path: `/${string}`) {
  const response = await fetch(API_URL + path);
  const data = await response.json() as T | null;
  return data;
}

export const getPlayers = () => getApiData<Player[]>(`/players/all?team_id=${teamId}`);
export const getTeams = () => getApiData<Team[]>(`/teams/all`);
export const getMatchInfo = () => getApiData<MatchInfo[]>(`/matches/full-info?season=${season}&teamId=${teamId}`);