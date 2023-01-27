import Table from "../components/Table/Table.jsx";
import { getTeams } from "../utils/api.js";

export default async function TeamsPage() {
  const teams = await getTeams();
  const thId = +import.meta.env.VITE_THIONVILLE_ID;

  if (teams.length) {
    const thIndex = teams.findIndex(({ id }) => id === thId);
    if (thIndex > 0)
      [teams[0], teams[thIndex]] = [teams[thIndex], teams[0]];
  }

  return (
    <div className="container">
      <Table values={teams} columns={teamsTableColumns} />
    </div>
  );
}

const teamsTableColumns: TableColumn<Team>[] = [
  {
    header: "N° FFE",
    getRow: ({ id }) => <a href={`http://www.echecs.asso.fr/FicheClub.aspx?Ref=${id}`}>{id}</a>
  },
  {
    header: "Nom",
    getRow: (team) => team.name
  },
  {
    header: "Adresse",
    getRow: ({ address, city, zip }) => <div className="pre-line">{`${address}\n${zip} ${city.toUpperCase()}`}</div>
  },
  {
    header: "Email",
    getRow: (team) => team.email
  },
  {
    header: "Tél.",
    getRow: (team) => team.tel
  },
  {
    header: "Site web",
    getRow: ({ website }) => website && <div><a href={"http://" + website} target="_blank">Visiter</a></div>
  }
];