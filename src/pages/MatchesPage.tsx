import Link from "../components/Link/Link.jsx";
import Table from "../components/Table/Table.jsx";
import { getMatches, THIONVILLE_ID } from "../utils/api.js";
import formatDate from "../utils/date-formatter.js";

export default async function MatchesPage() {
  const matches = await getMatches();

  const now = Date.now();
  const nextMatchId = matches.find(({ date }) => {
    return new Date(date).getTime() > now;
  })?.id;

  return (
    <div>
      <div className="container">
        <h2>Matchs</h2>
        <p>Tous les matchs commencent à <strong>14h15</strong>.</p>
        <Table columns={getColumns(nextMatchId)} values={matches} />
      </div>
    </div>
  );
}

function getColumns(nextMatchId: number | undefined): TableColumn<Match>[] {
  return [
    {
      header: "Rd.",
      getRow: ({ season, round }) => <Link href={`/equipe?saison=${season}&ronde=${round}`}>{round}</Link>
    },
    {
      header: "Blancs au 1er",
      getRow: ({ id, whiteTeamName, whiteTeamId }) => {
        if (nextMatchId === id && whiteTeamId !== THIONVILLE_ID)
          return <strong>{whiteTeamName}</strong>;
        return whiteTeamName;
      }
    },
    {
      header: "Noirs au 1er",
      getRow: ({ id, blackTeamName, blackTeamId }) => {
        if (nextMatchId === id && blackTeamId !== THIONVILLE_ID)
          return <strong>{blackTeamName}</strong>;
        return blackTeamName;
      }
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
}
