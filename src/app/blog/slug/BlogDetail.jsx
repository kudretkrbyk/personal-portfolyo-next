import { useParams } from "react-router-dom";
import {
  useGetBlogBySlugQuery,
  useGetAllBlogsQuery,
} from "../services/blogApi";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_IMG_URL;

export default function BlogDetail() {
  const stripHTML = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const { slug } = useParams();
  const { data: blog, isLoading, isError } = useGetBlogBySlugQuery(slug);
  const { data: allBlogs = [] } = useGetAllBlogsQuery();

  const contentRef = useRef(null);
  const [toc, setToc] = useState([]);

  useEffect(() => {
    if (!blog?.content || !contentRef.current) return;

    const headings = contentRef.current.querySelectorAll("h2");
    if (!headings || headings.length === 0) return;

    const tocItems = Array.from(headings).map((heading) => {
      const id = heading.textContent.trim().replace(/\s+/g, "-").toLowerCase();
      heading.id = id;
      return { id, text: heading.textContent };
    });

    setToc(tocItems);
  }, [blog]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-dark text-white flex justify-center items-center">
        Yükleniyor...
      </div>
    );

  if (isError || !blog)
    return (
      <div className="min-h-screen bg-dark text-white flex justify-center items-center">
        Blog bulunamadı.
      </div>
    );

  return (
    <section className="bg-dark py-20 text-white">
      <Helmet>
        <title>{`${blog.title} | Kudret Kırbıyık`}</title>
        <meta
          name="description"
          content={stripHTML(blog.content?.slice(0, 150))}
        />
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={stripHTML(blog.content?.slice(0, 150))}
        />
        <meta property="og:image" content={`${API_URL}${blog.image}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Kudret Kırbıyık" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta
          name="twitter:description"
          content={stripHTML(blog.content?.slice(0, 150))}
        />
        <meta name="twitter:image" content={`${API_URL}${blog.image}`} />
        <link
          rel="canonical"
          href={`https://kudretkrbyk.com.tr/blog/${blog.slug}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: stripHTML(blog.content?.slice(0, 160)),
            image: `${API_URL}${blog.image}`,
            author: {
              "@type": "Person",
              name: "Kudret Kırbıyık",
              url: "https://kudretkrbyk.com.tr",
            },
            publisher: {
              "@type": "Organization",
              name: "Kudret Kırbıyık",
              logo: {
                "@type": "ImageObject",
                url: "https://kudretkrbyk.com.tr/logo.png",
              },
            },
            datePublished: blog.publishedAt,
            dateModified: blog.publishedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://kudretkrbyk.com.tr/blog/${blog.slug}`,
            },
          })}
        </script>
      </Helmet>

      <div className="container max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-4">
          <a href="/" className="hover:underline text-primary">
            Anasayfa
          </a>{" "}
          &gt;{" "}
          <a href="/blog" className="hover:underline text-primary">
            Blog
          </a>{" "}
          &gt; {blog.title}
        </nav>

        {/* Görsel + Başlık */}
        <img
          loading="lazy"
          crossOrigin="anonymous"
          src={`${API_URL}${blog.image}`}
          alt={blog.title}
          width="800"
          height="300"
          className="rounded-lg mb-6 w-full h-64 object-cover"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-400 text-sm mb-6">
          📅 {new Date(blog.publishedAt).toLocaleDateString("tr-TR")}
        </p>

        {/* İçindekiler */}
        {toc.length > 0 && (
          <div className="bg-gray-800 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-2">İçindekiler</h2>
            <ul className="space-y-1 list-disc list-inside text-body-color">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* İçerik */}
        {blog.content && (
          <article
            ref={contentRef}
            className="prose prose-invert max-w-none [&_h2]:text-red-500 [&_h2]:font-bold [&_h2]:text-xl flex flex-col items-start gap-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        )}

        {/* Paylaşım butonları */}
        <div className="mt-10 flex gap-4 text-sm">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
            className="text-sky-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
            className="text-blue-300 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>

        {/* Benzer bloglar */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Benzer Yazılar</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {allBlogs
              .filter((b) => b.slug !== slug)
              .slice(0, 2)
              .map((b) => (
                <a
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg"
                >
                  <img
                    src={`${API_URL}${b.image}`}
                    className="w-full h-40 object-cover"
                    alt={b.title}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{b.title}</h3>
                    <p className="text-sm text-gray-400">
                      {stripHTML(b.content.slice(0, 80))}...
                    </p>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
