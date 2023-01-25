import MatchesTable from "../components/MatchesTable/MatchesTable.jsx";
import PlayersTable from "../components/PlayersTable/PlayersTable.jsx";

class Router {
  #url = "";
  #routes = new Map<string, Route>();
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

  getRoute(url: string) {
    return this.#routes.get(url);
  }

  addRoute(url: string, page: Route) {
    this.#routes.set(url, page);
    return this;
  }

  setUrl(url: string) {
    this.#url = url;
    this.notify();
  }

  onUrlChange(subscription: (page: Route) => void) {
    this.#subscriptions.add(subscription);

    return () => this.#subscriptions.delete(subscription);
  }

  notify(): void {
    const page = this.#routes.get(this.#url) ?? this.#routes.get("404")!;
    this.#subscriptions.forEach((subscription) => subscription(page));
  }
}

const router = new Router();

router
  .addRoute("/", {
    title: "Joueurs",
    component: PlayersTable
  })
  .addRoute("/joueurs", router.getRoute("/")!)
  .addRoute("/matchs", {
    title: "Matchs",
    component: MatchesTable
  });

export default router;