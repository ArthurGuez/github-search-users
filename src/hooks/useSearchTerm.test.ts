import { renderHook, act } from "@testing-library/react";
import { useSearchTerm } from "./useSearchTerm";

describe("useSearchTerm", () => {
  it("should initialize with an empty search term", () => {
    const { result } = renderHook(() => useSearchTerm());
    expect(result.current.searchTerm).toBe("");
  });

  it("should update search term when setSearchTerm is called", () => {
    const { result } = renderHook(() => useSearchTerm());

    act(() => {
      result.current.setSearchTerm("Test");
    });

    expect(result.current.searchTerm).toBe("Test");
  });

  it("should reset search term when resetSearch is called", () => {
    const { result } = renderHook(() => useSearchTerm());

    act(() => {
      result.current.setSearchTerm("Test");
      result.current.resetSearch();
    });

    expect(result.current.searchTerm).toBe("");
  });
});
