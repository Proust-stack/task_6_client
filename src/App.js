import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormPage from "./pages/FormPage";
import LoginPage from "./pages/LoginPage";
import MessagesPage from "./pages/MessagesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/messages/" element={<MessagesPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
