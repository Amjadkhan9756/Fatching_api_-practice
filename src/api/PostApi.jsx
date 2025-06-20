import { useState, useEffect } from "react";
import "./Api.css";

const Holdings = () => {
  const [data, setData] = useState([]);
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

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      setData((Data) => Data.filter((post) => post.id !== id));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="section-post">
      {/* Posts Grid */}
      <div className="posts-grid">
        {data.map(({ id, title, body }) => (
          <div className="post-card" key={id}>
            <p>
              <strong>{title}</strong>
            </p>
            <p>{body}</p>
            <button onClick={() => handleDelete(id)}>Delete</button>
            <button>Edit</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Holdings;
