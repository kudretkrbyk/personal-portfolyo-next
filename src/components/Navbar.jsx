"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../services/auth/authSlice";
import { CiLogout } from "react-icons/ci";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(user);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "Anasayfa", href: "/anasayfa" },
    { title: "Hizmetlerim", href: "/hizmetler" },
    { title: "Portfolyo", href: "/portfolyo" },
    { title: "Blog", href: "/blog" },
    { title: "İletişim", href: "/iletisim" },
  ];

  return (
    <nav className="w-full min-h-10 z-50 transition-all duration-300 bg-dark/95 backdrop-blur-sm shadow-lg">
      <div className="container py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/anasayfa"
            className="text-2xl font-bold heading-gradient"
          >
            <img
              loading="lazy"
              className="w-60 h-16 object-cover object-center"
              src="/kudretkrbyk-logo.webp"
              alt="kudret-krbyk-logo"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.title}
                className="nav-link font-medium"
              >
                {item.title}
              </Link>
            ))}
            {isLoggedIn && (
              <button
                aria-label="Çıkış Yap"
                onClick={() => dispatch(logout())}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-600"
              >
                <CiLogout />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Menüyü Aç"
            className="md:hidden text-body-color hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "min-h-screen opacity-100 p-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="border-t border-border-color pt-4">
            {menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.title}
                className="block py-2 nav-link font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
