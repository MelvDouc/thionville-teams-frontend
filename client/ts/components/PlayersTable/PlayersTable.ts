import { getPlayers } from "../../utils/api.js";
import Table from "../Table.js";
import PlayersTableColumns from "./PlayersTableColumns.js";

export default async function PlayersTable() {
  const players = await getPlayers() ?? [];
  players.sort((a, b) => b.rating - a.rating);
  return Table(PlayersTableColumns, players);
}