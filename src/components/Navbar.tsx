import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn, logout, getUserId } from "../auth";

export default function Navbar() {
  const loc = useLocation().pathname;
  const navigate = useNavigate();
  const [logged, setLogged] = useState(isLoggedIn());
  const [uid, setUid] = useState<string | null>(getUserId());

  useEffect(() => {
    setLogged(isLoggedIn());
    setUid(getUserId());
  }, [loc]);

  function handleLogin() {
    navigate("/login");
  }

  function handleLogout() {
    logout();
    setLogged(false);
    setUid(null);
    navigate("/login");
  }

  return (
    <div className="navbar">
      <div className="brand">
        <div className="logo" />
        <div>
          <h1>RemoteCare</h1>
          <div style={{ fontSize: 12, color: "#7a6a9f" }}>
            Skincare & Home Essentials
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div className="nav-links" role="navigation" aria-label="main">
        <Link to="/vouchers" className={loc.startsWith("/vouchers") ? "active" : ""}>
          Vouchers
        </Link>
        <Link to="/wallet" className={loc.startsWith("/wallet") ? "active" : ""}>
          Wallet
        </Link>
        <Link to="/transactions" className={loc.startsWith("/transactions") ? "active" : ""}>
          Transactions
        </Link>

        {!logged ? (
          <button
            onClick={handleLogin}
            style={{
              marginLeft: 8,
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(90deg,#7C3AED,#A78BFA)",
              color: "white",
              fontWeight: 700,
            }}
          >
            Login
          </button>
        ) : (
          <>
            <div
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                background: "rgba(124,58,237,0.08)",
                color: "#6b46c1",
                fontWeight: 700,
              }}
            >
              {uid?.slice(0, 8)}
            </div>

            <button
              onClick={handleLogout}
              style={{
                marginLeft: 8,
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid rgba(124,58,237,0.12)",
                background: "transparent",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
