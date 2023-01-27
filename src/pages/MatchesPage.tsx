import Link from "../components/Link/Link.jsx";
import Table from "../components/Table/Table.jsx";
import { getMatches } from "../utils/api.js";
import formatDate from "../utils/date-formatter.js";

export default async function MatchesPage() {
  const matchInfo = await getMatches();

  const fragment = document.createDocumentFragment();
  fragment.append(
    <p className="info">Tous les matchs commencent à <strong>14h15</strong>.</p>,
    <div className="grid-center">
      <Table columns={matchesTableColumns} values={matchInfo} />
    </div>
  );
  return fragment;
}

const matchesTableColumns: TableColumn<Match>[] = [
  {
    header: "Rd.",
    getRow: ({ id, round }) => <Link href={`/equipe?id_match=${id}`}>{round}</Link>
  },
  {
    header: "Blancs au 1er",
    getRow: (match) => match.whiteTeamName
  },
  {
    header: "Noirs au 1er",
    getRow: (match) => match.blackTeamName
  },
  {
    header: "Adresse",
    getRow: (match) => <div className="pre-line">{match.address}</div>
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