import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UNSELECTED_GITHUB_USER } from "../../__mocks__/github";
import UserCard from "./UserCard";

describe("UserCard component", () => {
  const mockToggleSelect = vi.fn();

  it("should render", () => {
    render(
      <UserCard
        canSelect
        toggleSelect={mockToggleSelect}
        user={UNSELECTED_GITHUB_USER}
      />
    );

    expect(screen.getByTestId("user-card")).toBeInTheDocument();
  });

  it("shouldn't display the checkbox when canSelect is false", () => {
    render(
      <UserCard
        canSelect={false}
        toggleSelect={mockToggleSelect}
        user={UNSELECTED_GITHUB_USER}
      />
    );

    const userCheckbox = screen.queryByTestId("user-checkbox");
    expect(userCheckbox).not.toBeInTheDocument();
  });
});
