import { v4 as uuidv4 } from "uuid";
import type { IUser } from "../types/index.js";

export class User {
  public id: string;
  public username: string;
  public createdAt: string;

  private constructor(id: string, username: string, createdAt: string) {
    this.id = id;
    this.username = username;
    this.createdAt = createdAt;
  }

  static create(username: string): User {
    return new User(uuidv4(), username, new Date().toISOString());
  }

  static fromJSON(data: IUser): User {
    return new User(data.id, data.username, data.createdAt);
  }

  toJSON(): IUser {
    return {
      id: this.id,
      username: this.username,
      createdAt: this.createdAt,
    };
  }
}
