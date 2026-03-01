import { useNavigate } from "react-router-dom";

function Login({ onLogin, isAuthenticated }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin(true);
    navigate("/profile", { replace: true });
  };

  return (
    <div>
      <h2>Login</h2>
      {isAuthenticated ? (
        <p>You are already logged in.</p>
      ) : (
        <>
          <p>This is a simulated login.</p>
          <button onClick={handleLogin}>Log in</button>
        </>
      )}
    </div>
  );
}

export default Login;