import Header from "./components/Header/Header.jsx";
import router from "./utils/router.js";

export default function App() {
  const setUrl = router.setUrl.bind(router);
  window.onpopstate = () => setUrl(location.pathname);
  router.onUrlChange(({ title }) => document.title = `Équipe N3 | ${title}`);

  const app = (
    <div id="App">
      <Header setUrl={setUrl} />
      <main $init={(element) => {
        router.onUrlChange(async ({ component: page }) => {
          element.replaceChildren(await page());
        });
      }}></main>
    </div>
  );

  router.setUrl(location.pathname);
  return app;
}