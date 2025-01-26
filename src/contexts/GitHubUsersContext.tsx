import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useState } from "react";
import type { GitHubUser } from "../services/search-users";

interface GitHubUsersContextType {
  gitHubUsers: GitHubUser[] | null;
  selectedGitHubUsers: number[];
  setGitHubUsers: (users: GitHubUser[] | null) => void;
  toggleSelectAllGitHubUsers: () => void;
  toggleGitHubUserSelection: (userId: number) => void;
}

const GitHubUsersContext = createContext<GitHubUsersContextType | undefined>(
  undefined
);

export function useGitHubUsersContext() {
  const context = useContext(GitHubUsersContext);

  if (!context) {
    throw new Error(
      "useGitHubUsersContext must be used within a GitHubUsersProvider"
    );
  }

  return context;
}

export default function GitHubUsersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [gitHubUsers, setGitHubUsers] = useState<GitHubUser[] | null>(null);
  const [selectedGitHubUsers, setSelectedGitHubUsers] = useState<number[]>([]);

  const toggleGitHubUserSelection = useCallback((userId: number) => {
    setSelectedGitHubUsers((prevState) => {
      if (prevState.includes(userId)) {
        return prevState.filter((id) => id !== userId);
      }

      return [...prevState, userId];
    });
  }, []);

  function toggleSelectAllGitHubUsers() {
    if (!gitHubUsers) {
      return;
    } else if (gitHubUsers.length === selectedGitHubUsers.length) {
      setSelectedGitHubUsers([]);
    } else {
      setSelectedGitHubUsers(gitHubUsers.map(({ id }) => id));
    }
  }

  return (
    <GitHubUsersContext.Provider
      value={{
        gitHubUsers,
        selectedGitHubUsers,
        setGitHubUsers,
        toggleGitHubUserSelection,
        toggleSelectAllGitHubUsers,
      }}
    >
      {children}
    </GitHubUsersContext.Provider>
  );
}
