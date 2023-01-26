import { getTeams } from "../../utils/api.js";
import Table from "../Table/Table.jsx";
import TeamsTableColumns from "./TeamsTableColumns.jsx";

export default async function TeamsTable() {
  const teams = await getTeams();
  const thId = +import.meta.env.VITE_THIONVILLE_ID;
  if (teams.length) {
    const thIndex = teams.findIndex(({ id }) => id === thId);
    if (thIndex !== -1)
      [teams[0], teams[thIndex]] = [teams[thIndex], teams[0]];
  }

  return (
    <Table columns={TeamsTableColumns} values={teams} />
  );
}