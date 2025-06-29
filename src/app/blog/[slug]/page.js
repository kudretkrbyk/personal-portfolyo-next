"use client";
import { useGetAllBlogsQuery } from "../../../services/blogApi";
import Link from "next/link";
import Head from "next/head";

const API_URL = process.env.NEXT_PUBLIC_IMG_URL;

export default function Blog() {
  const { data: blogs = [], isLoading, isError } = useGetAllBlogsQuery();

  const stripHTML = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark text-white flex justify-center items-center">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-dark text-white flex justify-center items-center">
        Bloglar yüklenirken bir hata oluştu.
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Blog Yazıları | Kudret Kırbıyık</title>
        <meta
          name="description"
          content="Kocaeli web tasarımı ve geliştiricisi Kudret Kırbıyık'ın blog yazıları. Geliştirme deneyimleri, teknik ipuçları ve güncel teknolojiler hakkında içerikler."
        />
        <meta property="og:title" content="Blog Yazıları | Kudret Kırbıyık" />
        <meta
          property="og:description"
          content="Geliştirme deneyimleri, teknik ipuçları ve güncel teknolojiler hakkında içerikler."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kudret Kırbıyık" />
        <meta property="og:image" content="/seo-blog-thumbnail.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog Yazıları | Kudret Kırbıyık" />
        <meta
          name="twitter:description"
          content="Geliştirme deneyimleri, teknik ipuçları ve güncel teknolojiler hakkında içerikler."
        />
        <meta name="twitter:image" content="/seo-blog-thumbnail.jpg" />
        <link rel="canonical" href="https://kudretkrbyk.com.tr/blog" />
      </Head>

      <section className="section bg-dark min-h-screen">
        <div className="container">
          <div className="flex flex-col items-center pb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white pb-4">
              Son <span className="heading-gradient">Blog</span> Yazılarım
            </h1>
            <p className="text-body-color max-w-2xl text-center">
              Teknoloji ve yazılım dünyasındaki deneyimlerimi ve öğrendiklerimi
              paylaştığım blog yazılarım
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="card flex flex-col items-start group"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    loading="lazy"
                    crossOrigin="anonymous"
                    src={`${API_URL}${post.image}`}
                    alt={post.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 items-start justify-between">
                  <span className="text-primary text-sm font-medium">
                    {new Date(post.publishedAt).toLocaleDateString("tr-TR")}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-body-color">
                    {stripHTML(post.content).slice(0, 150)}...
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary hover:text-white transition-colors"
                  >
                    Devamını Oku
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
