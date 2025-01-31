import { useState } from "react";

export function useSearchTerm() {
  const [searchTerm, setSearchTerm] = useState("");

  function resetSearch() {
    setSearchTerm("");
  }

  return { searchTerm, setSearchTerm, resetSearch };
}
