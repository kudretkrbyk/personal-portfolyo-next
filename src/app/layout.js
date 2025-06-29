import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Kudret Kırbıyık | Web Geliştirici",
  description: "Kocaeli web tasarım, frontend geliştirme, modern UI çözümleri",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
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
