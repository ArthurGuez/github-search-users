import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useCallback, useContext, useState } from "react";
import type { GitHubUser } from "../services/search-users";

export interface SelectableGitHubUser extends GitHubUser {
  isSelected: boolean;
  uniqueId?: string;
}

interface GitHubUsersContextType {
  duplicateSelectedUsers: () => void;
  gitHubUsers: SelectableGitHubUser[] | null;
  removeSelectedUsers: () => void;
  setGitHubUsers: Dispatch<SetStateAction<SelectableGitHubUser[] | null>>;
  toggleGitHubUserSelection: (userId: number | string) => void;
  toggleSelectAllGitHubUsers: () => void;
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

  function duplicateSelectedUsers() {
    setGitHubUsers((prevState) => {
      if (!prevState) {
        return null;
      }

      return prevState.reduce<SelectableGitHubUser[]>((prev, user) => {
        if (user.isSelected) {
          const uniqueId = crypto.randomUUID();

          return [
            ...prev,
            { ...user, isSelected: false },
            { ...user, isSelected: false, uniqueId },
          ];
        }

        return [...prev, user];
      }, []);
    });
  }

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

  const toggleGitHubUserSelection = useCallback((userId: number | string) => {
    setGitHubUsers((prevState) => {
      if (!prevState) {
        return null;
      }

      const userIndex = prevState.findIndex((user) =>
        user.uniqueId ? user.uniqueId === userId : user.id === userId
      );

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
        duplicateSelectedUsers,
        gitHubUsers,
        removeSelectedUsers,
        setGitHubUsers,
        toggleGitHubUserSelection,
        toggleSelectAllGitHubUsers,
      }}
    >
      {children}
    </GitHubUsersContext.Provider>
  );
}
