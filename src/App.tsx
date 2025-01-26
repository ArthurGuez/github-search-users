import { useState } from "react";
import Header from "./components/Header/Header";
import UserList from "./components/UserList/UserList";

import styles from "./App.module.css";
import Actions from "./components/Actions/Actions";
import GitHubUsersProvider from "./contexts/GitHubUsersContext";

function App() {
  const [query, setQuery] = useState("");

  function handleResetSearch() {
    setQuery("");
  }

  return (
    <div>
      <Header />
      <main className={styles.layout}>
        <label className={styles.search}>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </label>
        <GitHubUsersProvider>
          <Actions onResetUsers={handleResetSearch} />
          <UserList query={query} />
        </GitHubUsersProvider>
      </main>
    </div>
  );
}

export default App;
