import { getTeams } from "../../utils/api.js";
import Table from "../Table/Table.jsx";
import TeamsTableColumns from "./TeamsTableColumns.jsx";

export default async function TeamsTable() {
  const teams = (await getTeams()) ?? [];

  return (
    <Table columns={TeamsTableColumns} values={teams} />
  );
}