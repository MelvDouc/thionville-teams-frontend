import BoardInfoPage from "../pages/BoardInfoPage.jsx";
import MatchesPage from "../pages/MatchesPage.jsx";
import PlayersPage from "../pages/PlayersPage.jsx";
import TeamsPage from "../pages/TeamsPage.jsx";

class Router {
  #url!: string;
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
      if (location.pathname !== this.#url)
        history.pushState({}, "", this.#url);
    });
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
    for (const [path, page] of this.#routes) {
      if (
        typeof path === "string" && path === this.#url
        || path instanceof RegExp && path.test(this.#url)
      ) {
        this.#subscriptions.forEach((subscription) => subscription(page));
        return;
      }
    }

    const page = this.#routes.get("404")!;
    this.#subscriptions.forEach((subscription) => subscription(page));
  }
}

const router = new Router();
const playersPage = {
  title: "Joueurs",
  component: PlayersPage
};

router
  .addRoute("/", playersPage)
  .addRoute("/joueurs", playersPage)
  .addRoute("/matchs", {
    title: "Matchs",
    component: MatchesPage
  })
  .addRoute("/equipes", {
    title: "Équipes",
    component: TeamsPage
  })
  .addRoute(/^\/equipe/, {
    title: "Équipe",
    component: BoardInfoPage
  });

export default router;