import router from "./utils/router.js";

export default function App() {
  window.onpopstate = () => router.setUrl(location.pathname);
  router.onUrlChange(({ title }) => {
    document.title = title;
  });

  const app = (
    <div id="App">
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