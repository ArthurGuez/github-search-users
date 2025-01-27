import type { SelectableGithubUser } from "../contexts/github-users/GithubUsersProvider";

export const SELECTED_GITHUB_USER: SelectableGithubUser = {
  id: 1,
  login: "Alice",
  isSelected: true,
  avatar_url: "https://avatars.githubusercontent.com/u/1038?v=4",
  html_url: "https://github.com/Arthur",
  type: "User",
};

export const UNSELECTED_GITHUB_USER: SelectableGithubUser = {
  id: 2,
  login: "Bob",
  isSelected: false,
  avatar_url: "https://avatars.githubusercontent.com/u/1038?v=4",
  html_url: "https://github.com/Arthur",
  type: "User",
};

export const MOCK_SELECTABLE_GITHUB_USERS: SelectableGithubUser[] = [
  SELECTED_GITHUB_USER,
  UNSELECTED_GITHUB_USER,
  {
    id: 3,
    login: "Charlie",
    isSelected: true,
    avatar_url: "https://avatars.githubusercontent.com/u/1038?v=4",
    html_url: "https://github.com/Arthur",
    type: "User",
  },
];
