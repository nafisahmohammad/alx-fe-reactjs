import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileSettings from "./pages/ProfileSettings";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <header style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #ddd" }}>
        <Link to="/">Home</Link>
        <Link to="/posts/1">Post 1</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>

        <button onClick={() => setIsAuthenticated(false)} style={{ marginLeft: "auto" }}>
          Logout
        </button>
      </header>

      <div style={{ maxWidth: 900, margin: "20px auto", padding: 12 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login onLogin={setIsAuthenticated} isAuthenticated={isAuthenticated} />}
          />

          {/* Dynamic route */}
          <Route path="/posts/:postId" element={<Post />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/profile" element={<Profile />}>
              {/* Nested routes */}
              <Route index element={<ProfileDetails />} />
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
