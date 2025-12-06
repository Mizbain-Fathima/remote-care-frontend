import { useEffect, useState } from "react";
import { getTransactions } from "../api";

export default function TransactionsPage() {
  const USER_ID = "0024fd90-b092-4a5e-aee6-d48d10d8a66e";
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getTransactions(USER_ID).then(setData).catch(console.error);
  }, []);

  if (!data) return <div className="app-container"><p>Loading...</p></div>;

  return (
    <div className="app-container">
      <h2 style={{ marginBottom:8 }}>Transactions</h2>
      <p style={{ color:"#6b5a8e" }}>Your recent purchases</p>

      <div style={{ marginTop:16, display:"grid", gap:12 }}>
        {data.transactions.length === 0 && <div style={{ padding:20, borderRadius:12, background:"#fff", border:"1px solid rgba(0,0,0,0.03)" }}>No transactions yet.</div>}
        {data.transactions.map((t:any) => (
          <div key={t.id} style={{ background:"rgba(255,255,255,0.6)", borderRadius:12, padding:14, display:"flex", justifyContent:"space-between", alignItems:"center", border:"1px solid rgba(255,255,255,0.45)" }}>
            <div>
              <div style={{ fontWeight:700 }}>{t.status}</div>
              <div style={{ color:"#6b5a8e" }}>Voucher: {t.voucherId}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontWeight:800 }}>₹{t.amount}</div>
              <div style={{ color:"#6b5a8e", fontSize:13 }}>{new Date(t.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
