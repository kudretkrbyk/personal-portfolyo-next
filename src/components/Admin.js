"use client";
import { useState } from "react";
import BlogSetting from "./BlogSetting";
import PortfolyoSetting from "./PortfolyoSetting";
export default function Admin() {
  const [activeTab, setActiveTab] = useState("blog");

  const renderContent = () => {
    switch (activeTab) {
      case "portfolio":
        return <PortfolyoSetting />;
      case "blog":
        return <BlogSetting />;
      default:
        return <div className="text-white">Bir modül seçin</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Menü */}
      <aside className="w-60 bg-gray-800 p-6">
        <h2 className="text-2xl font-bold text-white mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <button
            aria-label="Portfolyo Ayarları"
            onClick={() => setActiveTab("portfolio")}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "portfolio"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            Portfolyo Ayarları
          </button>
          <button
            aria-label="Blog Ayarları"
            onClick={() => setActiveTab("blog")}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "blog"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            Blog Ayarları
          </button>
        </nav>
      </aside>

      {/* İçerik */}
      <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
