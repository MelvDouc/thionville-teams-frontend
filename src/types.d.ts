type Obs<T> = import("reactfree-jsx").Observable<T>;

interface Route {
  title: string;
  component: (...args: any[]) => Node | Promise<Node>;
}

interface Player {
  /**
   * The FIDE id.
   */
  id: number;
  ffeId: string;
  lastName: string;
  firstName: string;
  email: string;
  tel: string | null;
  rating: number;
  teamId: number;
  updatedAt: string;
}

interface Team {
  id: number;
  name: string;
  address: string;
  city: string;
  zip: string;
  email: string;
  tel: string;
  website: string | null;
}

interface Match {
  id: number;
  round: number;
  whiteTeamName: string;
  blackTeamName: string;
  address: string;
  city: string;
  zip: string;
  season: number;
  date: string;
}

interface BoardInfo {
  ffeId: string;
  firstName: string;
  lastName: string;
  board: number;
  color: "B" | "N";
  rating: number;
  result: number;
}

interface TableColumn<T> {
  header: string;
  getRow: (element: T) => string | number | Node;
}