"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth >= 768);
    }
  }, []);

  return (
    <section
      id="home"
      className="min-h-80 h-screen flex items-center bg-dark p-8 w-full"
    >
      <div className="container flex w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center w-full">
          {isDesktop && (
            <div className="hidden md:flex md:justify-center md:items-center">
              <img
                src="/assets/11.webp"
                alt="kudret-krbyk"
                width="400"
                height="400"
                loading="lazy"
                className="w-[400px] h-[400px] object-cover object-center animate-border-morph"
              />
            </div>
          )}
          <div className="flex flex-col items-center md:items-start justify-center space-y-6 xl:text-nowrap">
            <h1 className="text-4xl md:text-6xl font-bold">Merhaba, Ben </h1>
            <p className="heading-gradient text-6xl py-2">Kudret Kırbıyık</p>
            <p className="text-xl md:text-2xl text-body-color">
              Frontend Developer
            </p>
            <div className="flex flex-wrap xl:flex-nowrap gap-4">
              <Link href="/portfolyo" className="btn-primary w-full">
                Portfolyo
              </Link>
              <Link href="/iletisim" className="btn-primary w-full">
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
