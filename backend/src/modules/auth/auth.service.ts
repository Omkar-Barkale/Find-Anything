import { User } from "./domain/classes/User.js";
import type { IUser } from "./domain/types/index.js";
import * as authRepository from "./auth.repository.js";

export function login(username: string): IUser {
  const existing: IUser | undefined = authRepository.findByUsername(username);
  if (existing) {
    return existing;
  }
  const user: User = User.create(username);
  return authRepository.save(user.toJSON());
}

export function getMe(userId: string): IUser {
  const user: IUser | undefined = authRepository.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export function updateProfile(userId: string, username: string): IUser {
  const user: IUser | undefined = authRepository.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const existingWithUsername: IUser | undefined =
    authRepository.findByUsername(username);
  if (existingWithUsername && existingWithUsername.id !== userId) {
    throw new Error("Username already taken");
  }

  user.username = username;
  return authRepository.save(user);
}
