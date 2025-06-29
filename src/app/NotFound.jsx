import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      {" "}
      <Helmet>
        {" "}
        <title>404 - Sayfa Bulunamadı | Kudret Kırbıyık</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-dark text-white flex flex-col justify-center items-center px-6">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Sayfa Bulunamadı
        </h2>
        <p className="text-body-color mb-8 text-center max-w-xl">
          Aradığınız sayfa mevcut değil ya da taşınmış olabilir. Ana sayfaya
          dönerek gezinmeye devam edebilirsiniz.
        </p>

        <Link
          to="/anasayfa"
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all"
        >
          Ana Sayfaya Dön
        </Link>

        {/* Dekoratif */}
        <div className="mt-12 text-gray-600 text-sm">
          Kudret Kırbıyık © {new Date().getFullYear()}
        </div>
      </div>
    </section>
  );
}
