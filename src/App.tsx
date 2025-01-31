import Header from "./components/Header/Header";
import UserList from "./components/UserList/UserList";

import styles from "./App.module.css";
import Actions from "./components/Actions/Actions";
import GithubUsersProvider from "./contexts/github-users/GithubUsersProvider";
import { useEditMode } from "./hooks/useEditMode";
import { useSearchTerm } from "./hooks/useSearchTerm";
import Search from "./components/Search/Search";

function App() {
  const { isEditMode } = useEditMode();
  const { searchTerm, setSearchTerm, resetSearch } = useSearchTerm();

  return (
    <>
      <Header />
      <main className={styles.layout} data-testid="app">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <GithubUsersProvider>
          {isEditMode && <Actions onResetUsers={resetSearch} />}
          <UserList searchTerm={searchTerm} />
        </GithubUsersProvider>
      </main>
    </>
  );
}

export default App;
