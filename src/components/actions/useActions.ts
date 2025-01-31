import { useGithubUsers } from "../../contexts/github-users/useGithubUsers";

export function useActions(onResetUsers: () => void) {
  const {
    duplicateSelectedUsers,
    githubUsers,
    removeSelectedUsers,
    toggleSelectAllGithubUsers,
  } = useGithubUsers();

  const selectedGithubUsersCount =
    githubUsers?.filter((user) => user.isSelected).length ?? 0;

  const areActionsDisabled = !githubUsers || githubUsers.length === 0;

  const areAllUsersSelected =
    githubUsers?.length === selectedGithubUsersCount &&
    githubUsers.length !== 0;

  function handleDeleteUsers() {
    removeSelectedUsers();

    if (githubUsers?.length === selectedGithubUsersCount) {
      onResetUsers();
    }
  }

  return {
    areActionsDisabled,
    areAllUsersSelected,
    selectedGithubUsersCount,
    handleDeleteUsers,
    toggleSelectAllGithubUsers,
    duplicateSelectedUsers,
  };
}
