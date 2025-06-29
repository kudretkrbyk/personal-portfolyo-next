import { Helmet } from "react-helmet-async";

export default function Features() {
  const features = [
    {
      icon: "💻",
      title: "Web Tasarım ve Geliştirme",
      description:
        "Modern ve responsive web uygulamaları geliştirme konusunda uzmanım. İster Wordpess tabanlı ister size özel yazımları kullanan web siteleri oluşturabilirim.",
    },
    {
      icon: "🎨",
      title: "UI/UX Tasarım",
      description: "Kullanıcı dostu ve estetik arayüzler tasarlıyorum.",
    },
    {
      icon: "📱",
      title: "Mobil Uyumluluk",
      description:
        "Tüm cihazlarda kusursuz çalışan web siteleri oluşturuyorum.",
    },
    {
      icon: "⚡",
      title: "Performans Optimizasyonu",
      description: "Hızlı ve optimize edilmiş web uygulamaları geliştiriyorum.",
    },
    {
      icon: "🔒",
      title: "Güvenlik",
      description:
        "Güvenli ve sağlam altyapıya sahip uygulamalar oluşturuyorum.",
    },
    {
      icon: "🔧",
      title: "Teknik Destek",
      description: "Sürekli teknik destek ve bakım hizmeti sunuyorum.",
    },
  ];

  return (
    <section id="features" className="bg-dark py-20">
      <Helmet>
        <title>Öne Çıkan Yeteneklerim | Kudret Kırbıyık</title>
        <meta
          name="description"
          content="Web tasarım ve  geliştirme, UI/UX tasarımı, mobil uyumluluk, performans optimizasyonu ve daha fazlası."
        />
        <meta
          property="og:title"
          content="Öne Çıkan Yeteneklerim | Kudret Kırbıyık"
        />
        <meta
          property="og:description"
          content="Web tasarım ve  geliştirme, UI/UX tasarımı, mobil uyumluluk ve daha fazlası. Kudret Kırbıyık'ın sunduğu hizmetleri keşfedin."
        />
        <meta property="og:image" content="/seo-thumbnail.jpg" />{" "}
        {/* varsayılan görsel */}
      </Helmet>

      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Web programlama hizmetlerimde öne çıkan {}
            <span className="heading-gradient">Çalışma Alanlarım</span>
          </h1>
          <p className="text-body-color max-w-2xl mx-auto">
            Yazılım geliştirme sürecinde uzmanlaştığım alanlar ve size
            sunabileceğim hizmetler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h2>
              <p className="text-body-color">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
