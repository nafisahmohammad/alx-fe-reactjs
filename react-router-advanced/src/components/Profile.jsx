import { Link, Outlet } from "react-router-dom";

function Profile() {
  return (
    <div>
      <h2>Profile</h2>

      <nav style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <Link to="details">Profile Details</Link>
        <Link to="settings">Profile Settings</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default Profile;