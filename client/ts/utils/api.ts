import { MatchInfo, Player } from "../types.js";

const API_URL = "http://localhost:5000/api/v1";

async function getApiData<T>(path: `/${string}`) {
  const response = await fetch(API_URL + path);
  const data = await response.json() as T | null;
  return data;
}

export const getPlayers = () => getApiData<Player[]>("/players");
export const getMatchInfo = () => getApiData<MatchInfo[]>("/matches");