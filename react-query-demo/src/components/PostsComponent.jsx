import { useQuery } from "@tanstack/react-query";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

function PostsComponent() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 60 * 1000, // 1 minute fresh
    gcTime: 5 * 60 * 1000, // cache time (v5 uses gcTime)
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading posts...</p>;

  if (isError) {
    return (
      <div>
        <p style={{ color: "crimson" }}>
          Error: {error?.message || "Something went wrong"}
        </p>
        <button onClick={() => refetch()} style={{ padding: "10px 14px" }}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={() => refetch()} style={{ padding: "10px 14px" }}>
          Refetch Posts
        </button>
        {isFetching && <span>Updating...</span>}
      </div>

      <p style={{ marginTop: 12, color: "#555" }}>
        Cached data last updated:{" "}
        {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "N/A"}
      </p>

      <ul style={{ marginTop: 16 }}>
        {data.slice(0, 10).map((post) => (
          <li key={post.id} style={{ marginBottom: 12 }}>
            <strong>{post.title}</strong>
            <p style={{ margin: "6px 0", color: "#444" }}>{post.body}</p>
          </li>
        ))}
      </ul>

      <p style={{ color: "#666" }}>Showing first 10 posts (out of {data.length}).</p>
    </div>
  );
}

export default PostsComponent;