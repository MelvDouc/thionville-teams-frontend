type Req = import("express").Request;
type Res = import("express").Response;

interface Player {
  ffeId: string;
  fideId: string;
  email: string | null;
  tel: string | null;
  firstName: string | null;
  lastName: string | null;
  cat: string;
  refTitle: string | null;
  active: boolean;
  rating: number;
}

interface Team {
  ffeId: string;
  name: string;
  address: string;
  zip: string;
  city: string;
  tel: string;
}

interface Match {
  id: number;
  round: number;
  opponentId: string;
  isHome: boolean;
  isWhiteOnBoard1: boolean;
  date: Date;
}

interface MatchWithOpponent {
  id: number;
  round: number;
  date: Date;
  isHome: boolean;
  isWhiteOnBoard1: boolean;
  opponent: string;
  address: string;
}