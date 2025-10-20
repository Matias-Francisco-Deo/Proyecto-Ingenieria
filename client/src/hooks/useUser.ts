// import type { UserInfo } from "../types/types";
// import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const getKey = () => localStorage.getItem("key");
  const getUsername = () => localStorage.getItem("username");
  const getId = () => Number(localStorage.getItem("userId"));

  const setKey = (key: string) => localStorage.setItem("key", key);
  const setUsername = (username: string) =>
    localStorage.setItem("username", username);

  const setId = (id: number) => localStorage.setItem("userId", id.toString());

  return {
    setKey,
    getKey,
    setUsername,
    getUsername,
    setId,
    getId,
  };
}
