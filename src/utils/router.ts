import BoardInfoPage from "../pages/BoardInfoPage.jsx";
import MatchesPage from "../pages/MatchesPage.jsx";
import PlayersPage from "../pages/PlayersPage.jsx";
import TeamsPage from "../pages/TeamsPage.jsx";

class Router {
  #url = "";
  #routes = new Map<string | RegExp, Route>();
  #subscriptions = new Set<(page: Route) => void>();

  constructor() {
    this.#routes.set("404", {
      title: "Page non trouvée",
      component: () => {
        const h1 = document.createElement("h1");
        h1.innerText = "Page non trouvée";
        return h1;
      }
    });
    this.onUrlChange(() => {
      // if (location.pathname !== this.#url)
      history.pushState({}, "", this.#url);
    });
  }

  getRoute(url: string): Route | undefined {
    return this.#routes.get(url);
  }

  addRoute(url: string | RegExp, page: Route): this {
    this.#routes.set(url, page);
    return this;
  }

  setUrl(url: string): void {
    this.#url = url;
    this.notify();
  }

  onUrlChange(subscription: (page: Route) => void): void {
    this.#subscriptions.add(subscription);
  }

  notify(): void {
    for (const [path, route] of this.#routes) {
      if (typeof path === "string" && path === this.#url || path instanceof RegExp && path.test(this.#url)) {
        this.#subscriptions.forEach((subscription) => subscription(route));
        return;
      }
    }

    const notFoundPage = this.#routes.get("404")!;
    this.#subscriptions.forEach((subscription) => subscription(notFoundPage));
  }
}

const router = new Router();

router
  .addRoute("/", {
    title: "Joueurs",
    component: PlayersPage
  })
  .addRoute("/joueurs", router.getRoute("/")!)
  .addRoute("/matchs", {
    title: "Matchs",
    component: MatchesPage
  })
  .addRoute("/equipes", {
    title: "Équipes",
    component: TeamsPage
  })
  .addRoute(/^\/equipe(\?.+)?/, {
    title: "Équipe",
    component: BoardInfoPage
  });

export default router;