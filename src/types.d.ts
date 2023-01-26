import("reactfree-jsx");

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

interface MatchInfo {
  round: number;
  whiteTeam: string;
  blackTeam: string;
  address: string;
  city: string;
  zip: string;
  date: string;
}

interface TableColumn<T> {
  header: string;
  getRow: (element: T) => string | number | Node;
}