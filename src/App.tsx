import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import VouchersPage from "./pages/VouchersPage";
import WalletPage from "./pages/WalletPage";
import TransactionsPage from "./pages/TransactionsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/vouchers" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vouchers" element={<VouchersPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
