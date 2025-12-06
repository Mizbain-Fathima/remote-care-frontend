import { useState } from "react";

export default function WelcomeHero({ onSearch }: { onSearch?: (q: string) => void }) {
  const [q, setQ] = useState("");

  return (
    <div className="hero">
      <div className="hero-left">
        <h2 style={{ margin:0, fontSize:34, color:"#3b1f6b" }}>Welcome to RemoteCare</h2>
        <p style={{ marginTop:8, color:"#6b5a8e" }}>
          Personalized skincare & ergonomic home office essentials — curated for you.
        </p>

        <div className="search" style={{ marginTop:16 }}>
          <input
            placeholder="Search products, e.g. 'vitamin C serum', 'standing desk'..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && onSearch) onSearch(q); }}
          />
          <button onClick={() => onSearch && onSearch(q)}>Search</button>
        </div>

        <div style={{ marginTop:12, display:"flex", gap:8 }}>
          <div className="chip">Skincare</div>
          <div className="chip">Home Office</div>
          <div className="chip">Best Sellers</div>
        </div>
      </div>

      <div className="hero-right">
        <div style={{
          width:320, height:220, borderRadius:18,
          background: "linear-gradient(135deg,#fff7ff,#f5f0ff)",
          display:"flex", alignItems:"center", justifyContent:"center", color:"#8b63f0",
          boxShadow: "0 16px 40px rgba(124,58,237,0.08)"
        }}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:28, fontWeight:800}}>Glow & Comfort</div>
            <div style={{marginTop:6, color:"#7a6a9f"}}>Skincare + Home Office essentials</div>
          </div>
        </div>
      </div>
    </div>
  );
}
