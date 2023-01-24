import { MatchInfo, TableColumn } from "../../types.js";
import formatDate from "../../utils/date-formatter.js";

const MatchesTableColumns: TableColumn<MatchInfo>[] = [
  {
    header: "Rd.",
    getRow: (match) => match.round
  },
  {
    header: "Adversaire",
    getRow: (match) => match.opponent
  },
  {
    header: "Adresse",
    getRow: (match) => match.address
  },
  {
    header: "Ville",
    getRow: (match) => match.city
  },
  {
    header: "Code postal",
    getRow: (match) => match.zip
  },
  {
    header: "Date",
    getRow: (match) => formatDate(match.date)
  }
];

export default MatchesTableColumns;