import { getMatchInfo } from "../../utils/api.js";
import Table from "../Table/Table.jsx";
import MatchesTableColumns from "./MatchesTableColumns.js";

export default async function MatchesTable() {
  const matchInfo = await getMatchInfo();

  return (
    <Table columns={MatchesTableColumns} values={matchInfo} />
  );
}