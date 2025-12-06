const API_BASE = "https://remote-care-backend.onrender.com";

import { getAuth, saveSession } from "./auth";

// ------------------------------
// Auth header helper
// ------------------------------
function authHeaders(): Record<string, string> {
  const auth = getAuth();
  if (!auth?.token) return {};
  return { Authorization: auth.token };
}

// ------------------------------
// Fetch vouchers
// ------------------------------
export async function getVouchers(category?: string, query?: string) {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (query) params.append("query", query);
  params.append("page", "1");
  params.append("page_size", "20");

  const res = await fetch(`${API_BASE}/v1/searchvouchers?${params.toString()}`, {
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) throw new Error("Failed to fetch vouchers");
  return res.json().then((d) => d.vouchers || []);
}

// ------------------------------
// Fetch wallet balance
// ------------------------------
export async function getBalance(userId: string) {
  const res = await fetch(`${API_BASE}/v1/getbalance?user_id=${userId}`, {
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) throw new Error("Failed to fetch balance");
  return res.json();
}

// ------------------------------
// Fetch transactions
// ------------------------------
export async function getTransactions(userId: string) {
  const params = new URLSearchParams({
    user_id: userId,
    page: "1",
    page_size: "20",
  });

  const res = await fetch(`${API_BASE}/v1/listtransactions?${params.toString()}`, {
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}

// ------------------------------
// Buy voucher
// ------------------------------
export async function buyVoucher(payload: {
  user_id: string;
  voucher_id: string;
  upi_id: string;
  payment_method?: string;
  request_id: string;
}) {
  const body = {
    ...payload,
    payment_method: payload.payment_method || "MOCK_UPI",
  };

  const res = await fetch(`${API_BASE}/v1/buyvoucher`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to buy voucher");
  return res.json();
}

// ------------------------------
// Login (JWT auth)
// ------------------------------
export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/v1/login`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();

  // Save JWT + userId etc.
  saveSession({
    token: data.token,
    userId: data.userId,
    email: data.email,
  });

  return data;
}
