import { getMatchInfo } from "../../utils/api.js";
import Table from "../Table.js";
import MatchesTableColumns from "./MatchesTableColumns.js";

export default async function MatchesTable() {
  const matchInfo = (await getMatchInfo())!;
  const table = Table(MatchesTableColumns, matchInfo);
  const rows = table.querySelectorAll("tbody tr");
  const now = Date.now();
  for (let i = 0; i < matchInfo.length; i++) {
    if (new Date(matchInfo[i].date).getTime() > now) {
      rows[i].classList.add("selected");
      break;
    }
  }
  return table;
}