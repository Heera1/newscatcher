import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import HeadlinePage from "./pages/headline";
import LoginPage from "./pages/longin";
import NewsPage from "./pages/news";
import Layout from "./component/Layout";
import Favorite from "./pages/favorite";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/headline" element={<HeadlinePage />} />
        <Route path="/favorite" element={<Favorite />} />
      </Route>
    </Routes>
  );
}

export default App;
