import { NextFunction, Request, Response } from "express";
import { } from "mysql2";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly MYSQL_HOST: string;
      readonly MYSQL_USER: string;
      readonly MYSQL_PASSWORD: string;
      readonly MYSQL_DATABASE_NAME: string;
      readonly API_TOKEN: string;
      readonly THIONVILLE_TEAM_ID: number;
    }
  }
}

export type Req = Request;
export type Res = Response;
export type NextFn = NextFunction;
export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";
export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";
export type Path = `/${string}`;
export type Handler = (req: Req, res: Res) => unknown;

export interface WithId {
  id: number;
}

export interface IPlayer extends WithId {
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
  teamId: ITeam["id"];
  updatedAt: string;
}

export interface IUser extends WithId {
  email: string;
  password: string;
  token: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface ITeam extends WithId {
  name: string;
  address: string;
  city: string;
  zip: string;
  email: string;
  tel: string;
  website: string | null;
}

export interface IDbMatch extends WithId {
  round: number;
  whiteTeamId: number;
  blackTeamId: number;
  homeTeamId: number;
  season: number;
  date: string;
}

export interface IMatch extends Exclude<IDbMatch, "homeTeamId" | "season"> {
  whiteTeam: string;
  blackTeam: string;
  address: string;
  city: string;
  zip: string;
}

export interface MatchResult {
  boardAndColor: string;
  fullName: string;
  result: number;
  opponent: string;
}

export type Roster = {
  ffeId: string;
  fullName: string;
  boardAndColor: string;
}[];

interface MysqlOperators<T extends {}> {
  $and?: MySqlSearchRecord<T> | MysqlOperators<T>;
  $or?: MySqlSearchRecord<T> | MysqlOperators<T>;
}

export type MySqlSearchRecord<T extends {}> = Partial<{
  [K in keyof T]: T[K] | MysqlOperators<T>;
}>;