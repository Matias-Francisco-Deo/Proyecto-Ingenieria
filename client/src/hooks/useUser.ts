// import type { UserInfo } from "../types/types";
// import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const getKey = () => localStorage.getItem("key");
  const getUsername = () => localStorage.getItem("username");

  const setKey = (key: string) => localStorage.setItem("key", key);
  const setUsername = (username: string) =>
    localStorage.setItem("username", username);

  //   const { data } = useQuery<UserInfo>({
  //     queryKey: ["me"],
  //     queryFn: () => getUser(getKey() || ""), // Evitar pasar `undefined`
  //   });

  //   const getUserInfo = async (key: string | null): Promise<UserInfo> => {
  //     if (!key) return { user_name: "Guest", key: "" };
  //     const resp = await fetch(
  //       `http://localhost:8080/auth?username=${getUsername()}&pass=${}`
  //     );
  //     return resp.json();
  //   };

  return {
    // avatar: data?.avatar,
    setKey,
    getKey,
    setUsername,
    getUsername,
  };
}
