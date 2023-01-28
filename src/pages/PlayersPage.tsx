import { Observable } from "reactfree-jsx";
import Table from "../components/Table/Table.jsx";
import { getPlayers, THIONVILLE_ID } from "../utils/api.js";
import formatDate from "../utils/date-formatter.js";

export default async function PlayersPage() {
  const players = await getPlayers();
  const allPlayerSet = new Set(players);
  const thionvillePlayersSet = new Set(players.filter(({ teamId }) => teamId === THIONVILLE_ID));
  const visibilityObs = new Observable(allPlayerSet);

  return (
    <div className="container">
      <h2>Tous les joueurs</h2>
      <form className="mb-3">
        <div>
          <input
            type="checkbox"
            id="thionville-players-input"
            className="me-2"
            onchange={(e) => {
              const { checked } = e.target as HTMLInputElement;
              visibilityObs.setValue((checked) ? thionvillePlayersSet : allPlayerSet);
            }}
          />
          <label htmlFor="thionville-players-input">Thionville seulement</label>
        </div>
      </form>
      <Table columns={playersTableColumns} values={players} visibilityObs={visibilityObs} />
    </div>
  );
}

const playersTableColumns: TableColumn<Player>[] = [
  {
    header: "N° FIDE",
    getRow: (player) => player.id
  },
  {
    header: "N° FFE",
    getRow: (player) => player.ffeId
  },
  {
    header: "Prénom NOM",
    getRow: (player) => `${player.firstName} ${player.lastName.toUpperCase()}`
  },
  {
    header: "Email",
    getRow: (player) => player.email
  },
  {
    header: "Tél.",
    getRow: (player) => player.tel ?? ""
  },
  {
    header: "Elo",
    getRow: (player) => player.rating || 1199
  },
  {
    header: "Denière màj",
    getRow: (player) => formatDate(player.updatedAt)
  }
];