import fs from "fs";
import path from "path";
import { DATA_DIR } from "../../constants.js";
import type { ITweet } from "./domain/types/index.js";

const TWEETS_FILE: string = path.join(DATA_DIR, "tweets.json");

function readTweets(): ITweet[] {
  const data: string = fs.readFileSync(TWEETS_FILE, "utf-8");
  return JSON.parse(data) as ITweet[];
}

function writeTweets(tweets: ITweet[]): void {
  fs.writeFileSync(TWEETS_FILE, JSON.stringify(tweets, null, 2));
}

export function findAll(): ITweet[] {
  return readTweets();
}

export function findById(id: string): ITweet | undefined {
  return readTweets().find((t: ITweet): boolean => t.id === id);
}

export function save(tweet: ITweet): ITweet {
  const tweets: ITweet[] = readTweets();
  const index: number = tweets.findIndex((t: ITweet): boolean => t.id === tweet.id);
  if (index >= 0) {
    tweets[index] = tweet;
  } else {
    tweets.push(tweet);
  }
  writeTweets(tweets);
  return tweet;
}

export function remove(id: string): void {
  const tweets: ITweet[] = readTweets().filter(
    (t: ITweet): boolean => t.id !== id
  );
  writeTweets(tweets);
}
