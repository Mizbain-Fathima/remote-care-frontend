import { useEffect, useState } from "react";
import { getBalance } from "../api";

export default function WalletPage() {
  const USER_ID = "0024fd90-b092-4a5e-aee6-d48d10d8a66e";
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    getBalance(USER_ID).then(setWallet).catch(console.error);
  }, []);

  if (!wallet) return <div className="app-container"><p>Loading wallet...</p></div>;

  return (
    <div className="app-container">
      <div style={{ display:"flex", gap:20, alignItems:"center", marginBottom:20 }}>
        <div style={{
          background: "linear-gradient(135deg,#fff,#f7f0ff)",
          borderRadius:18, padding:20, minWidth:320, boxShadow:"0 10px 30px rgba(120,60,237,0.06)",
          border:"1px solid rgba(255,255,255,0.45)"
        }}>
          <div style={{ fontSize:14, color:"#6b5a8e" }}>Current Balance</div>
          <div style={{ fontSize:34, fontWeight:800, marginTop:8 }}>₹{wallet.balance} {wallet.currency}</div>
        </div>

        <div style={{ flex:1 }}>
          <h3 style={{ margin:0 }}>Wallet actions</h3>
          <p style={{ color:"#6b5a8e" }}>Top-up, view statements, or manage payment methods.</p>
          <div style={{ marginTop:12, display:"flex", gap:12 }}>
            <button style={{ padding:"10px 14px", borderRadius:10, border:"none", background:"#7C3AED", color:"white", fontWeight:700 }}>Top up</button>
            <button style={{ padding:"10px 14px", borderRadius:10, border:"1px solid rgba(124,58,237,0.12)", background:"transparent" }}>Manage</button>
          </div>
        </div>
      </div>
    </div>
  );
}
