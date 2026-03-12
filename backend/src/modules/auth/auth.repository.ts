import fs from "fs";
import path from "path";
import { DATA_DIR } from "../../constants.js";
import type { IUser } from "./domain/types/index.js";

const USERS_FILE: string = path.join(DATA_DIR, "users.json");

function readUsers(): IUser[] {
  const data: string = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data) as IUser[];
}

function writeUsers(users: IUser[]): void {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function findAll(): IUser[] {
  return readUsers();
}

export function findById(id: string): IUser | undefined {
  return readUsers().find((u: IUser): boolean => u.id === id);
}

export function findByUsername(username: string): IUser | undefined {
  return readUsers().find((u: IUser): boolean => u.username === username);
}

export function save(user: IUser): IUser {
  const users: IUser[] = readUsers();
  const index: number = users.findIndex((u: IUser): boolean => u.id === user.id);
  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }
  writeUsers(users);
  return user;
}
