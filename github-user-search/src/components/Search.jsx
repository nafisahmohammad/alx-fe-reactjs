import { useState } from "react";
import { fetchAdvancedUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = async (e, newPage = 1) => {
    e.preventDefault();

    if (!username) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetchAdvancedUsers(
        username,
        location,
        minRepos,
        newPage
      );

      if (newPage === 1) {
        setUsers(response.data.items);
      } else {
        setUsers((prev) => [...prev, ...response.data.items]);
      }

      setPage(newPage);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={(e) => handleSearch(e)}
        className="bg-white p-6 rounded-lg shadow-md grid gap-4 md:grid-cols-3"
      >
        <input
          type="text"
          placeholder="GitHub username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min repositories"
          className="border p-2 rounded"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button
          type="submit"
          className="md:col-span-3 bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Search
        </button>
      </form>

      {/* States */}
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {/* Results */}
      <div className="grid gap-4 mt-6 sm:grid-cols-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded-lg flex gap-4 items-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{user.login}</h3>
              <p className="text-sm text-gray-500">
                Score: {user.score}
              </p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {users.length > 0 && !loading && (
        <button
          onClick={(e) => handleSearch(e, page + 1)}
          className="mt-6 block mx-auto bg-gray-200 px-4 py-2 rounded"
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default Search;
