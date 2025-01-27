import { useContext } from "react";
import { GithubUsersContext } from "../contexts/github-users/githubUsersContext";

export function useGithubUsers() {
  const context = useContext(GithubUsersContext);

  if (!context) {
    throw new Error("useGithubUsers must be used within a GithubUsersProvider");
  }

  return context;
}
