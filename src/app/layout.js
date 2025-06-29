import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Kocaeli Web Tasarım | Kudret Kırbıyık",
  description: "Kocaeli web tasarım, frontend geliştirme, modern UI çözümleri",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:image" content="/seo-home-thumbnail.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://kudretkrbyk.com.tr" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-dark text-white">
        <StoreProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
