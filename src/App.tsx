import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header";
import useSearchGitHubUsers from "./hooks/useSearchGitHubUsers";

function App() {
  const { users, isLoading, error } = useSearchGitHubUsers("ArthurG");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!users || users.length === 0) {
    return <p>No user found</p>;
  }

  return (
    <div>
      <Header />
      <main className="layout">
        <div>
          <div>Search input</div>
          <div>Actions</div>
        </div>
        <div className="cards">
          {users.map((user) => (
            <Card key={user.id} user={user} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
