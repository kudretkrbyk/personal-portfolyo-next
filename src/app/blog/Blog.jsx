import { useState } from "react";
import { useGetAllBlogsQuery } from "../services/blogApi";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_IMG_URL;

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function Blog() {
  const { data: blogs = [], isLoading, isError } = useGetAllBlogsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogs.length / postsPerPage);
  console.log("bloglar", blogs);
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

  return (
    <section id="blog" className="section bg-dark">
      <Helmet>
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
        <meta property="og:image" content="/seo-blog-thumbnail.jpg" />
        <link rel="canonical" href="https://kudretkrbyk.com.tr/blog" />
      </Helmet>

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
          {currentPosts.map((post, index) => (
            <article
              key={index}
              className="card flex flex-col items-start  group"
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
              <div className="p-6 flex flex-col gap-3 items-start justify-between ">
                <span className="text-primary text-sm font-medium">
                  {formatDate(post.publishedAt)}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-body-color">
                  {stripHTML(post.content).slice(0, 150)}...
                </p>

                <Link
                  to={`/blog/${post.slug}`}
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
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i + 1
                ? "bg-primary text-white"
                : "bg-gray-800 text-white hover:bg-primary"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
