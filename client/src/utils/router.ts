import PlayersTable from "../components/PlayersTable/PlayersTable.jsx";

class Router {
  #url = "";
  #routes = new Map<string, Page>();
  #subscriptions = new Set<(page: Page) => void>();

  constructor() {
    this.#routes.set("404", {
      title: "Page Not Found",
      component: () => {
        const h1 = document.createElement("h1");
        h1.innerText = "Page not found";
        return h1;
      }
    });
  }

  public addRoute(url: string, page: Page) {
    this.#routes.set(url, page);
    return this;
  }

  public setUrl(url: string) {
    this.#url = url;
    this.notify();
  }

  public onUrlChange(subscription: (page: Page) => void) {
    this.#subscriptions.add(subscription);

    return () => this.#subscriptions.delete(subscription);
  }

  public notify(): void {
    const page = this.#routes.get(this.#url) ?? this.#routes.get("404")!;
    this.#subscriptions.forEach(async (subscription) => await subscription(page));
  }
}

const router = new Router();

router.addRoute("/", {
  title: "Joueurs",
  component: PlayersTable
});

export default router;