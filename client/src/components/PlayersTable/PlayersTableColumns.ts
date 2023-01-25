import formatDate from "../../utils/date-formatter.js";

const PlayersTableColumns: TableColumn<Player>[] = [
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

export default PlayersTableColumns;