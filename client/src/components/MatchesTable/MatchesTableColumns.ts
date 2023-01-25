import formatDate from "../../utils/date-formatter.js";

const MatchesTableColumns: TableColumn<MatchInfo>[] = [
  {
    header: "Rd.",
    getRow: (match) => match.round
  },
  {
    header: "Blancs au 1er",
    getRow: (match) => match.whiteTeam
  },
  {
    header: "Noirs au 1er",
    getRow: (match) => match.blackTeam
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