import MatchesTable from "../components/MatchesTable/MatchesTable.jsx";

export default async function MatchesPage() {
  const fragment = document.createDocumentFragment();
  fragment.append(
    <p className="info">Tous les matchs commencent à <strong>14h15</strong>.</p>,
    await MatchesTable()
  );
  return fragment;
}