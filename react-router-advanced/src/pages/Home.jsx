import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>Try routes:</p>
      <ul>
        <li><Link to="/profile">Profile (Protected)</Link></li>
        <li><Link to="/posts/1">Post 1 (Dynamic)</Link></li>
        <li><Link to="/posts/42">Post 42 (Dynamic)</Link></li>
      </ul>
    </div>
  );
}

export default Home;