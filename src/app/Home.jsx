import { Helmet } from "react-helmet-async";

import AnimatedSection from "../components/AnimatedSection";
import Hero from "../components/Hero";
import Resume from "../components/Resume";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          {" "}
          Kocaeli Web Tasarım | Web Geliştirici & Frontend Uzmanı | Kudret
          KIRBIYIK{" "}
        </title>
        <meta
          name="description"
          content="Kocaeli web tasarımı, kocaeli wordpress sitesi, UI/UX tasarımı ve modern frontend ve fullstack projeler. Benimle iletişime geçin ve projelerinizi hayata geçirelim."
        />
        <meta property="og:title" content="Kudret Kırbıyık | Web Geliştirici" />
        <meta
          property="og:description"
          content="Modern web uygulamaları, frontend projeleri ve UI tasarımlarıyla Kudret Kırbıyık'ın portfolyosunu keşfedin."
        />
        <meta property="og:image" content="/seo-home-thumbnail.jpg" />
      </Helmet>

      <Hero />

      <AnimatedSection>
        <Resume />
      </AnimatedSection>
    </>
  );
}
