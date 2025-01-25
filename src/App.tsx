import { useState } from "react";
import Header from "./components/Header/Header";
import UserList from "./components/UserList/UserList";

import styles from "./App.module.css";

function App() {
  const [query, setQuery] = useState("Arthur");

  return (
    <div>
      <Header />
      <main className={styles.layout}>
        <div>
          <div>
            <label>
              Search albums:
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </label>
          </div>
          <div className={styles.actions}>
            <div>Elements selected</div>
            <div>Actions</div>
          </div>
        </div>
        <UserList query={query} />
      </main>
    </div>
  );
}

export default App;
