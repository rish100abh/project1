import { useAuth } from "../../features/auth/hooks/useAuth";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div>
        <h2>My Fullstack App</h2>
        <p>Welcome, {user?.name}</p>
      </div>
      <button className="btn btn-outline" onClick={logout}>
        Logout
      </button>
    </header>
  );
}