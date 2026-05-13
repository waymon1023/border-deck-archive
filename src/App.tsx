import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CardDetailPage from "./pages/CardDetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cards/:id" element={<CardDetailPage />} />
    </Routes>
  );
}
