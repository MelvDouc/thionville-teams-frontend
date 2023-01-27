import Table from "../components/Table/Table.jsx";
import { urls, getApiData, season } from "../utils/api.js";

export default async function BoardInfoPage() {
  const roundStr = new URLSearchParams(location.search).get("id_match")!;
  const round = +roundStr;
  const boardInfoList = (isNaN(round))
    ? []
    : await getApiData<BoardInfo[]>(`${urls.BOARD_INFO}?season=${season}&round=${round}`, [] as BoardInfo[]);
  const averageRating = (boardInfoList.length)
    ? boardInfoList.reduce((acc, { rating }) => acc + rating, 0) / boardInfoList.length
    : 0;

  return (
    <div className="container">
      <Table columns={boardInfoListColumns} values={boardInfoList} />
      {averageRating && <p>Elo moyen :&nbsp;{averageRating.toFixed(2)}</p>}
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