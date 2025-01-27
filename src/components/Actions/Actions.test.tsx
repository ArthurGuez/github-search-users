import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Actions from "./Actions";
import { MOCK_SELECTABLE_GITHUB_USERS } from "../../__mocks__/github";
import GithubUsersProvider from "../../contexts/github-users/GithubUsersProvider";

describe("Actions component", () => {
  const mockOnResetUsers = vi.fn();

  it("should render", () => {
    render(
      <GithubUsersProvider>
        <Actions onResetUsers={mockOnResetUsers} />
      </GithubUsersProvider>
    );

    expect(screen.getByTestId("actions")).toBeInTheDocument();
  });

  it("should disable the checkbox and buttons when no users are selected", () => {
    render(
      <GithubUsersProvider>
        <Actions onResetUsers={mockOnResetUsers} />
      </GithubUsersProvider>
    );

    expect(screen.getByTestId("selected-users-count")).toHaveTextContent("0");
    expect(screen.getByTestId("select-all-checkbox")).toBeDisabled();
    expect(screen.getByTestId("duplicate-button")).toBeDisabled();
    expect(screen.getByTestId("delete-button")).toBeDisabled();
  });

  it("should enable the checkbox and buttons when users are selected", () => {
    render(
      <GithubUsersProvider initialGithubUsers={MOCK_SELECTABLE_GITHUB_USERS}>
        <Actions onResetUsers={mockOnResetUsers} />
      </GithubUsersProvider>
    );

    expect(screen.getByTestId("selected-users-count")).toHaveTextContent("2");
    expect(screen.getByTestId("select-all-checkbox")).toBeEnabled();
    expect(screen.getByTestId("duplicate-button")).toBeEnabled();
    expect(screen.getByTestId("delete-button")).toBeEnabled();
  });

  it("should have its checkbox checked when all users are selected", () => {
    render(
      <GithubUsersProvider
        initialGithubUsers={MOCK_SELECTABLE_GITHUB_USERS.map((user) => ({
          ...user,
          isSelected: true,
        }))}
      >
        <Actions onResetUsers={mockOnResetUsers} />
      </GithubUsersProvider>
    );

    const selectAllCheckbox = screen.getByTestId("select-all-checkbox");
    expect(selectAllCheckbox).toBeEnabled();
    expect(selectAllCheckbox).toBeChecked();
  });

  it("should select all profiles when the checkbox is checked", () => {
    render(
      <GithubUsersProvider initialGithubUsers={MOCK_SELECTABLE_GITHUB_USERS}>
        <Actions onResetUsers={mockOnResetUsers} />
      </GithubUsersProvider>
    );

    const selectAllCheckbox = screen.getByTestId("select-all-checkbox");
    expect(selectAllCheckbox).toHaveProperty("indeterminate", true);
    fireEvent.click(selectAllCheckbox);
    expect(selectAllCheckbox).toBeChecked();
  });

  it("should duplicate the selected users", () => {
    render(
      <GithubUsersProvider initialGithubUsers={MOCK_SELECTABLE_GITHUB_USERS}>
        <Actions onResetUsers={mockOnResetUsers} />
      </GithubUsersProvider>
    );

    const selectAllCheckbox = screen.getByTestId("select-all-checkbox");
    fireEvent.click(selectAllCheckbox);
    expect(screen.getByTestId("selected-users-count")).toHaveTextContent("3");
    const duplicateButton = screen.getByTestId("duplicate-button");
    fireEvent.click(duplicateButton);
    fireEvent.click(selectAllCheckbox);
    expect(screen.getByTestId("selected-users-count")).toHaveTextContent("6");
  });

  it("should delete the selected users", () => {
    render(
      <GithubUsersProvider initialGithubUsers={MOCK_SELECTABLE_GITHUB_USERS}>
        <Actions onResetUsers={mockOnResetUsers} />
      </GithubUsersProvider>
    );

    const selectAllCheckbox = screen.getByTestId("select-all-checkbox");
    fireEvent.click(selectAllCheckbox);
    expect(screen.getByTestId("selected-users-count")).toHaveTextContent("3");
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
    fireEvent.click(selectAllCheckbox);
    expect(screen.getByTestId("selected-users-count")).toHaveTextContent("0");
  });
});
