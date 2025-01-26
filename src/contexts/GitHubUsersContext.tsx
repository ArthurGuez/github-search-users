import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useCallback, useContext, useState } from "react";
import type { GitHubUser } from "../services/search-users";

export interface SelectableGitHubUser extends GitHubUser {
  isSelected: boolean;
}

interface GitHubUsersContextType {
  gitHubUsers: SelectableGitHubUser[] | null;
  setGitHubUsers: Dispatch<SetStateAction<SelectableGitHubUser[] | null>>;
  toggleSelectAllGitHubUsers: () => void;
  toggleGitHubUserSelection: (userId: number) => void;
  removeSelectedUsers: () => void;
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
  const [gitHubUsers, setGitHubUsers] = useState<SelectableGitHubUser[] | null>(
    null
  );

  function removeSelectedUsers() {
    setGitHubUsers((prevState) => {
      if (!prevState) {
        return null;
      }

      const newState = prevState.filter((gitHubUser) => !gitHubUser.isSelected);

      if (newState.length === 0) {
        return null;
      }

      return newState;
    });
  }

  const toggleGitHubUserSelection = useCallback((userId: number) => {
    setGitHubUsers((prevState) => {
      if (!prevState) {
        return null;
      }

      const userIndex = prevState.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
        return prevState;
      }

      const updatedUsers = [...prevState];
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        isSelected: !updatedUsers[userIndex].isSelected,
      };

      return updatedUsers;
    });
  }, []);

  function toggleSelectAllGitHubUsers() {
    setGitHubUsers((prevState) => {
      if (!prevState) {
        return null;
      }

      if (prevState.every((user) => user.isSelected)) {
        return prevState.map((user) => ({ ...user, isSelected: false }));
      }

      return prevState.map((user) => ({ ...user, isSelected: true }));
    });
  }

  return (
    <GitHubUsersContext.Provider
      value={{
        gitHubUsers,
        setGitHubUsers,
        toggleGitHubUserSelection,
        toggleSelectAllGitHubUsers,
        removeSelectedUsers,
      }}
    >
      {children}
    </GitHubUsersContext.Provider>
  );
}
