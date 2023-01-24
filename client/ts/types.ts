export interface Player {
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
  updatedAt: string;
}

export interface MatchInfo {
  round: number;
  opponent: string;
  address: string;
  city: string;
  zip: string;
  date: string;
}

export interface ElementDescriptor<K extends keyof HTMLElementTagNameMap> {
  tagName: K;
  properties?: Record<string, any>;
  $init?: (element: HTMLElementTagNameMap[K]) => void;
  children?: ElementDescriptor<any>[];
}

export interface TableColumn<T> {
  header: string;
  getRow: (element: T) => string | number;
}