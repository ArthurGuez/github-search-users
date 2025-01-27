import { describe, expect, it } from "vitest";
import EditModeProvider from "../../contexts/edit-mode/EditModeProvider";
import Header from "./Header";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Header component", () => {
  it("should render", () => {
    render(
      <EditModeProvider>
        <Header />
      </EditModeProvider>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("should allow to turn on the edit mode", () => {
    render(
      <EditModeProvider>
        <Header />
      </EditModeProvider>
    );

    const editModeToggle = screen.getByTestId("edit-mode-toggle");
    fireEvent.click(editModeToggle);

    expect(editModeToggle).toBeChecked();
  });
});
