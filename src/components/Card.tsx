import type { GitHubUser } from "../services/search-users";
import "./Card.css";

interface Props {
  user: GitHubUser;
}

export default function Card({ user }: Props) {
  return (
    <div className="card">
      <div className="card-layout">
        <input className="card-checkbox" type="checkbox" name="profile" id="" />
        <div className="card-content">
          <img className="card-avatar" src={user.avatar_url} alt={user.login} />
          <div className="card-text-container">
            <p>{user.id}</p>
            <p>{user.login}</p>
          </div>
          <a
            className="card-button"
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View profile
          </a>
        </div>
      </div>
    </div>
  );
}
