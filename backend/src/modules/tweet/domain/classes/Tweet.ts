import { v4 as uuidv4 } from "uuid";
import type { ITweet } from "../types/index.js";

export class Tweet {
  public id: string;
  public content: string;
  public authorId: string;
  public createdAt: string;

  private constructor(
    id: string,
    content: string,
    authorId: string,
    createdAt: string
  ) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
    this.createdAt = createdAt;
  }

  static create(content: string, authorId: string): Tweet {
    return new Tweet(uuidv4(), content, authorId, new Date().toISOString());
  }

  static fromJSON(data: ITweet): Tweet {
    return new Tweet(data.id, data.content, data.authorId, data.createdAt);
  }

  toJSON(): ITweet {
    return {
      id: this.id,
      content: this.content,
      authorId: this.authorId,
      createdAt: this.createdAt,
    };
  }
}
