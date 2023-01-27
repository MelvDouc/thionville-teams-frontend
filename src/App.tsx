import Header from "./components/Header/Header.jsx";
import router from "./utils/router.js";

export default function App() {
  const setUrl = router.setUrl.bind(router);
  window.onpopstate = () => setUrl(location.pathname + location.search);
  router.onUrlChange(({ title }) => document.title = `Équipes N3 | ${title}`);

  const App = (
    <div id="App">
      <Header />
      <main $init={(element) => {
        router.onUrlChange(async ({ component }) => {
          element.replaceChildren(await component());
        });
      }}></main>
    </div>
  );

  router.setUrl(location.pathname + location.search);
  return App;
}