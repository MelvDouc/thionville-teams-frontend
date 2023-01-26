import bcryptjs from "bcryptjs";
import { randomBytes } from "crypto";

const { genSalt, hash, compareSync } = bcryptjs;

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(10);
  const hashed = await hash(password, salt);
  return hashed;
}

export function comparePassword(password: string, hashed: string): boolean {
  return compareSync(password, hashed);
}

export function createToken(): string {
  return randomBytes(32).toString("hex");
}