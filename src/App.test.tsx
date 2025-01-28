import { describe, expect, it } from "vitest";
import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";
import EditModeProvider from "./contexts/edit-mode/EditModeProvider";

describe("App", () => {
  it("should render", () => {
    render(
      <EditModeProvider>
        <App />
      </EditModeProvider>
    );

    expect(screen.getByTestId("app")).toBeInTheDocument();
  });

  it("should update the query", () => {
    render(
      <EditModeProvider>
        <App />
      </EditModeProvider>
    );

    const searchInput = screen.getByRole("textbox");

    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(searchInput).toHaveValue("test");
  });

  it("should hide the actions when edit mode is off", () => {
    render(
      <EditModeProvider>
        <App />
      </EditModeProvider>
    );

    expect(screen.queryByTestId("actions")).not.toBeInTheDocument();
  });

  it("should show the actions when edit mode is on", () => {
    render(
      <EditModeProvider isEnabled>
        <App />
      </EditModeProvider>
    );

    expect(screen.getByTestId("actions")).toBeInTheDocument();
  });
});
