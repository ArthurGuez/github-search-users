import styles from "./Search.module.css";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function Search({ searchTerm, setSearchTerm }: Props) {
  return (
    <label className={styles.search} htmlFor="search-input">
      <input
        aria-label="Search for a user"
        id="search-input"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Search for a user"
        value={searchTerm}
      />
    </label>
  );
}
