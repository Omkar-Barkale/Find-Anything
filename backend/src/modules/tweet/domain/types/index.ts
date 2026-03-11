import type { IUser } from "../../auth/domain/types/index.js";

export interface ITweet {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export interface ITweetWithAuthor extends ITweet {
  author: IUser;
}
