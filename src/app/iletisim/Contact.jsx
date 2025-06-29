import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAddContactMutation } from "../services/contactApi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [addContact, { isLoading, isSuccess, isError, error }] =
    useAddContactMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContact(formData).unwrap();
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Form gönderme hatası:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: "📱",
      title: "Telefon",
      content: "+90 553 534 25 34",
      link: "tel:+905535342534",
    },
    {
      icon: "📧",
      title: "Email",
      content: "kudretkrbyk@gmail.com",
      link: "mailto:kudretkrbyk@gmail.com",
    },
    {
      icon: "📍",
      title: "Konum",
      content: "Kocaeli Web Tasarım ve Geliştirici",
      link: "https://g.co/kgs/nRDQGBs",
    },
  ];

  return (
    <section id="contact" className="section bg-dark">
      <Helmet>
        <title>Kocaeli Web Tasarım | Kudret Kırbıyık |İletişim </title>
        <meta
          name="description"
          content="Kudret Kırbıyık | Kocaeli web tasarımı hakkında  iletişime geçmek için iletişim formunu doldurun veya doğrudan e-posta ve telefon yoluyla ulaşın."
        />
        <meta property="og:title" content="İletişim | Kudret Kırbıyık" />
        <meta
          property="og:description"
          content="Kocaeli web tasarım için Kudret Kırbıyık ile iletişime geçin. Telefon, e-posta ve konum bilgileri bu sayfada."
        />
        <meta property="og:image" content="/seo-contact-thumbnail.jpg" />

        {/* 👇 Structured Data eklendi */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Kudret Kırbıyık",
        "image": "https://kudretkrbyk.com.tr/kudretkrbyk-logo.svg",
        "url": "https://kudretkrbyk.com.tr",
        "telephone": "+90-553-534-25-34",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kocaeli",
          "addressCountry": "TR"
        },
        "sameAs": [
          "https://g.co/kgs/nRDQGBs"
        ]
      }
    `}
        </script>
      </Helmet>

      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Benimle <span className="heading-gradient">İletişime Geçin</span>
          </h1>
          <p className="text-body-color max-w-2xl mx-auto">
            Projeleriniz için benimle iletişime geçebilirsiniz
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="grid gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="card flex items-center p-6">
                <div className="text-4xl mr-4">{info.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {info.title}
                  </h3>
                  <p className="text-body-color">
                    <a
                      href={info.link}
                      target={info.link.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {info.content}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="İsminiz"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-dark border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Adresiniz"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-dark border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Konu"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-dark border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Mesajınız"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full bg-dark border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary resize-none"
                  required
                ></textarea>
              </div>

              <button
                aria-label="Mesaj Gönder"
                type="submit"
                className="btn-primary w-full text-center"
                disabled={isLoading}
              >
                {isLoading ? "Gönderiliyor..." : "Mesaj Gönder"}
              </button>

              {isSuccess && (
                <p className="text-green-400 text-center mt-4">
                  Mesajınız başarıyla gönderildi!
                </p>
              )}
              {isError && (
                <p className="text-red-400 text-center mt-4">
                  Hata: {error?.data?.message || "Mesaj gönderilemedi."}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
