import MatchesTable from "./components/MatchesTable/MatchesTable.js";
import PlayersTable from "./components/PlayersTable/PlayersTable.js";

const App = document.getElementById("App")!;

App.append(
  await PlayersTable(),
  await MatchesTable()
);