import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { GitHubUser } from "../services/search-users";

interface GitHubUserContextType {
  areAllSelected: boolean;
  gitHubUsers: GitHubUser[] | null;
  setGitHubUsers: (users: GitHubUser[] | null) => void;
  toggleSelectAll: () => void;
}

const GitHubUserContext = createContext<GitHubUserContextType | undefined>(
  undefined
);

export function useGitHubUserContext() {
  const context = useContext(GitHubUserContext);
  if (!context) {
    throw new Error("useGitHubUserContext must be used within a UserProvider");
  }

  return context;
}

export default function GitHubUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [gitHubUsers, setGitHubUsers] = useState<GitHubUser[] | null>(null);
  const [areAllSelected, setAreAllSelected] = useState(false);

  const toggleSelectAll = () => {
    setAreAllSelected((prev) => !prev);
  };

  return (
    <GitHubUserContext.Provider
      value={{
        gitHubUsers,
        areAllSelected,
        setGitHubUsers,
        toggleSelectAll,
      }}
    >
      {children}
    </GitHubUserContext.Provider>
  );
}
