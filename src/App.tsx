import { useState } from "react";
import Header from "./components/Header/Header";
import UserList from "./components/UserList/UserList";

import styles from "./App.module.css";
import Actions from "./components/Actions/Actions";
import GithubUsersProvider from "./contexts/github-users/GithubUsersProvider";
import { useEditMode } from "./hooks/useEditMode";

function App() {
  const { isEditMode } = useEditMode();
  const [query, setQuery] = useState("");

  function handleResetSearch() {
    setQuery("");
  }

  return (
    <>
      <Header />
      <main className={styles.layout} data-testid="app">
        <label className={styles.search}>
          <input
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
          />
        </label>
        <GithubUsersProvider>
          {isEditMode && <Actions onResetUsers={handleResetSearch} />}
          <UserList query={query} />
        </GithubUsersProvider>
      </main>
    </>
  );
}

export default App;
