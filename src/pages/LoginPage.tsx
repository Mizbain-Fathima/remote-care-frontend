import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { login } from "../auth";   // correct!

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await login(email, pass);
      navigate("/vouchers");
    } catch (err) {
      setError("Invalid login");
    }
  }

  return (
    <div className="app-container">
      <div style={{ maxWidth: 420, margin: "40px auto", padding: 24, background:"rgba(255,255,255,0.45)", borderRadius:14 }}>
        <h2>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
          <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} />
          <button>Log in</button>
        </form>
      </div>
    </div>
  );
}
