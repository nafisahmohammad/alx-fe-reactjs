import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsComponent from "./components/PostsComponent";

const queryClient = new QueryClient();

function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ maxWidth: 900, margin: "30px auto", padding: 16 }}>
        <h1>React Query Demo</h1>

        <button
          onClick={() => setShowPosts((v) => !v)}
          style={{ padding: "10px 14px", marginBottom: 16 }}
        >
          {showPosts ? "Hide Posts (Unmount)" : "Show Posts (Remount)"}
        </button>

        {showPosts ? <PostsComponent /> : <p>PostsComponent is unmounted.</p>}
      </div>
    </QueryClientProvider>
  );
}

export default App;