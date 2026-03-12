import { Tweet } from "./domain/classes/Tweet.js";
import type { ITweet, ITweetWithAuthor } from "./domain/types/index.js";
import * as tweetRepository from "./tweet.repository.js";
import * as authRepository from "../auth/auth.repository.js";

export function getAll(): ITweetWithAuthor[] {
  const tweets: ITweet[] = tweetRepository.findAll();
  const users = authRepository.findAll();

  return tweets
    .map((tweet: ITweet): ITweetWithAuthor | null => {
      const author = users.find((u) => u.id === tweet.authorId);
      if (!author) return null;
      return { ...tweet, author };
    })
    .filter((t): t is ITweetWithAuthor => t !== null)
    .reverse();
}

export function create(content: string, authorId: string): ITweet {
  const tweet: Tweet = Tweet.create(content, authorId);
  return tweetRepository.save(tweet.toJSON());
}

export function update(
  id: string,
  content: string,
  userId: string
): ITweet {
  const tweet: ITweet | undefined = tweetRepository.findById(id);
  if (!tweet) {
    throw new Error("Tweet not found");
  }
  if (tweet.authorId !== userId) {
    throw new Error("Not authorized");
  }
  tweet.content = content;
  return tweetRepository.save(tweet);
}

export function remove(id: string, userId: string): { id: string } {
  const tweet: ITweet | undefined = tweetRepository.findById(id);
  if (!tweet) {
    throw new Error("Tweet not found");
  }
  if (tweet.authorId !== userId) {
    throw new Error("Not authorized");
  }
  tweetRepository.remove(id);
  return { id };
}
