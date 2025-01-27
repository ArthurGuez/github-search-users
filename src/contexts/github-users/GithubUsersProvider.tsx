import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import type { GithubUser } from "../../services/search-users";
import { GithubUsersContext } from "./githubUsersContext";

export interface SelectableGithubUser extends GithubUser {
  isSelected: boolean;
  uniqueId?: string;
}

export default function GithubUsersProvider({
  children,
  initialGithubUsers = null,
}: {
  children: ReactNode;
  initialGithubUsers?: SelectableGithubUser[] | null;
}) {
  const [githubUsers, setGithubUsers] = useState<SelectableGithubUser[] | null>(
    initialGithubUsers
  );

  function duplicateSelectedUsers() {
    setGithubUsers((prevState) => {
      if (!prevState) {
        return null;
      }

      return prevState.reduce<SelectableGithubUser[]>((prev, user) => {
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
    setGithubUsers((prevState) => {
      if (!prevState) {
        return null;
      }

      const newState = prevState.filter((githubUser) => !githubUser.isSelected);

      if (newState.length === 0) {
        return null;
      }

      return newState;
    });
  }

  const toggleGithubUserSelection = useCallback((userId: number | string) => {
    setGithubUsers((prevState) => {
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

  function toggleSelectAllGithubUsers() {
    setGithubUsers((prevState) => {
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
    <GithubUsersContext.Provider
      value={{
        duplicateSelectedUsers,
        githubUsers,
        removeSelectedUsers,
        setGithubUsers,
        toggleGithubUserSelection,
        toggleSelectAllGithubUsers,
      }}
    >
      {children}
    </GithubUsersContext.Provider>
  );
}
