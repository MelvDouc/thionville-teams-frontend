import Header from "./components/Header/Header.jsx";
import router from "./utils/router.js";
import "./App.scss";

export default function App() {
  const setUrl = router.setUrl.bind(router);
  window.onpopstate = () => setUrl(location.pathname + location.search);
  router.onUrlChange(({ title }) => document.title = `Équipes N3 | ${title}`);

  const App = (
    <div id="App">
      <Header />
      <main className="overflow-y-auto h-100 p-4" $init={updateUI}>
      </main>
    </div>
  );

  router.setUrl(location.pathname + location.search);
  return App;
}

function updateUI(container: HTMLElement) {
  router.onUrlChange(async ({ component }) => {
    container.replaceChildren(await component());
  });
}