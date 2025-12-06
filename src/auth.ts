const STORAGE_KEY = "rc_auth";

export type AuthState = {
  token: string;
  userId: string;
  email: string;
};

// --------------------------------------------------
// Save session (stores JWT + userId in localStorage)
// --------------------------------------------------
export function saveSession(data: AuthState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// --------------------------------------------------
// Load session from localStorage
// --------------------------------------------------
export function getAuth(): AuthState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthState;
  } catch {
    return null;
  }
}

// --------------------------------------------------
// Basic helpers
// --------------------------------------------------
export function isLoggedIn(): boolean {
  return Boolean(getAuth()?.token);
}

export function getUserId(): string | null {
  return getAuth()?.userId ?? null;
}

// --------------------------------------------------
// LOGIN — Calls your backend POST /v1/login
// Backend returns: { token, userId, email }
// --------------------------------------------------
export async function login(email: string, password: string) {
  const res = await fetch("https://remote-care-backend.onrender.com/v1/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();

  saveSession({
    token: data.token,
    userId: data.userId,
    email: data.email,
  });

  return data;
}

// --------------------------------------------------
// Logout — clears session
// --------------------------------------------------
export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}
