import Table from "../components/Table/Table.jsx";
import { getBoardInfoList } from "../utils/api.js";

export default async function BoardInfoPage() {
  const query = new URLSearchParams(location.search);
  const season = query.get("saison")!,
    round = query.get("ronde")!;
  const boardInfoList = await getBoardInfoList({ season, round });

  return (
    <div className="container">
      <h2>Joueurs</h2>
      {boardInfoList.length > 0
        ? <div>
          <Table columns={boardInfoListColumns} values={boardInfoList} />
          <p>Elo moyen :&nbsp;{(boardInfoList.reduce((acc, { rating }) => acc + rating, 0) / boardInfoList.length).toFixed(2)}</p>
        </div>
        : <p>Aucune équipe à afficher.</p>}
    </div>
  );
}

const boardInfoListColumns: TableColumn<BoardInfo>[] = [
  {
    header: "Éch.",
    getRow: ({ board, color }) => String(board) + color
  },
  {
    header: "Prénom NOM",
    getRow: ({ firstName, lastName }) => `${firstName} ${lastName.toUpperCase()}`
  },
  {
    header: "N° FFE",
    getRow: (boardInfo) => boardInfo.ffeId
  },
  {
    header: "Elo",
    getRow: (boardInfo) => boardInfo.rating
  }
];