type Voucher = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  discountPercent: number;
  price: number;
  currency: string;
};

type Props = {
  voucher: Voucher;
  onBuy: (id: string) => void;
};

function BrandBadge({ brand }: { brand: string }) {
  // brand initials for a nice visual (e.g., "GlowBoost" -> GB)
  const initials = brand
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div style={{
      width: 74,
      height: 74,
      borderRadius: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg,#f8f3ff,#efe7ff)",
      border: "1px solid rgba(255,255,255,0.6)",
      boxShadow: "inset 0 -8px 24px rgba(139,92,246,0.06)",
      fontWeight: 800,
      color: "#6b46c1",
      fontSize: 20,
    }}>
      {initials}
    </div>
  );
}

export default function VoucherCard({ voucher, onBuy }: Props) {
  return (
    <article className="voucher-card" aria-labelledby={`v-${voucher.id}`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div className="badge">{voucher.discountPercent}% OFF</div>
        <div style={{ marginLeft: "auto", color: "#7a6a9f", fontSize: 12 }}>{voucher.category}</div>
      </div>

      {/* Innovative visual: Brand badge + soft float accents */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 12 }}>
        <BrandBadge brand={voucher.brand} />
        <div style={{ flex: 1 }}>
          <h3 id={`v-${voucher.id}`} style={{ margin: 0, fontSize: 18 }}>{voucher.name}</h3>
          <p className="small-muted" style={{ marginTop: 8 }}>{voucher.description}</p>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ fontSize: 13 }}><strong>Brand:</strong> {voucher.brand}</div>
        </div>
      </div>

      <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 20, fontWeight: 800 }}>₹{voucher.price}</div>
      </div>

      <button className="buy-btn" onClick={() => onBuy(voucher.id)}>Buy Now</button>
    </article>
  );
}
