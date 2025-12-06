import { useEffect, useState } from "react";
import WelcomeHero from "../components/WelcomeHero";
import VoucherCard from "../components/VoucherCard";
import { getVouchers, buyVoucher } from "../api";
import { getUserId, isLoggedIn } from "../auth";
import { useNavigate } from "react-router-dom";

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll(category?: string, q?: string) {
    try {
      const items = await getVouchers(category, q);
      setVouchers(items);
    } catch (e) {
      console.error("Failed to load vouchers:", e);
    }
  }

  async function handleBuy(voucherId: string) {
  if (!isLoggedIn()) {
    alert("You must be logged in to buy a voucher.");
    navigate("/login");
    return;
  }

  try {
    const userId = getUserId()!;
    const reqId = crypto.randomUUID();

    const res = await buyVoucher({
      user_id: userId,
      voucher_id: voucherId,
      upi_id: "test@upi",
      request_id: reqId,
    });

    alert("Purchase: " + (res.status || "OK"));
  } catch (e) {
    console.error(e);
    alert("Purchase failed");
  }
}

  return (
    <div className="app-container">
      <WelcomeHero
        onSearch={(q) => {
          setQuery(q);
          fetchAll(undefined, q);
        }}
      />

      <div style={{ marginTop: 16 }}>
        <h2 style={{ margin: "6px 0 8px 0", fontSize: 24 }}>Featured</h2>
        <p style={{ margin: "0 0 20px 0", color: "#6b5a8e" }}>
          Hand-picked skincare and home office products.
        </p>

        <div className="voucher-grid">
          {vouchers.map((v) => (
            <VoucherCard key={v.id} voucher={v} onBuy={handleBuy} />
          ))}
        </div>
      </div>
    </div>
  );
}
