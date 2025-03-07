import { describe, expect, it } from "vitest";
import EditModeProvider from "../../contexts/edit-mode/EditModeProvider";
import UserList from "./UserList";
import { render, screen } from "@testing-library/react";
import GithubUsersProvider from "../../contexts/github-users/GithubUsersProvider";
import { MOCK_SELECTABLE_GITHUB_USERS } from "../../__mocks__/github";
import useSearchGithubUsers from "./useSearchGithubUsers";

vi.mock("./useSearchGithubUsers", () => ({
  default: vi.fn(),
}));

const mockUseSearchGithubUsers = vi.mocked(useSearchGithubUsers);

const SEARCH_TERM = "Arthur";

describe("UserList", () => {
  it("should display a loading state when isLoading is true", () => {
    mockUseSearchGithubUsers.mockReturnValue({
      isLoading: true,
      githubUsers: null,
      error: null,
    });

    render(
      <EditModeProvider>
        <GithubUsersProvider>
          <UserList searchTerm={SEARCH_TERM} />
        </GithubUsersProvider>
      </EditModeProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display an error when an error message is returned", () => {
    mockUseSearchGithubUsers.mockReturnValue({
      isLoading: false,
      githubUsers: null,
      error: "Something went wrong",
    });

    render(
      <EditModeProvider>
        <GithubUsersProvider>
          <UserList searchTerm={SEARCH_TERM} />
        </GithubUsersProvider>
      </EditModeProvider>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("shouldn't display a user list if there are no user returned", () => {
    mockUseSearchGithubUsers.mockReturnValue({
      isLoading: false,
      githubUsers: [],
      error: null,
    });

    render(
      <EditModeProvider>
        <GithubUsersProvider>
          <UserList searchTerm={SEARCH_TERM} />
        </GithubUsersProvider>
      </EditModeProvider>
    );

    expect(screen.getByTestId("no-user")).toBeInTheDocument();
  });

  it("should display a user list if users are returned", () => {
    mockUseSearchGithubUsers.mockReturnValue({
      isLoading: false,
      githubUsers: MOCK_SELECTABLE_GITHUB_USERS,
      error: null,
    });

    render(
      <EditModeProvider>
        <GithubUsersProvider>
          <UserList searchTerm={SEARCH_TERM} />
        </GithubUsersProvider>
      </EditModeProvider>
    );

    expect(screen.getByTestId("user-list")).toBeInTheDocument();
  });
});
