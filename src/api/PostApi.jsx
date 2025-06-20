import { useState, useEffect } from "react";
import "./hold.css";

const Holdings = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter posts by title
  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="section-post">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Posts Grid */}
      <div className="posts-grid">
        {filteredData.length === 0 ? (
          <p>No results found.</p>
        ) : (
          filteredData.map(({ id, title, body }) => (
            <div className="post-card" key={id}>
              <p><strong>{title}</strong></p>
              <p>{body}</p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Holdings;
