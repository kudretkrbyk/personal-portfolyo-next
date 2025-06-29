"use client";
import { useMemo, useState } from "react";

import LazyImage from "../../components/LazyImage";
import { useGetProjectsQuery } from "../../services/projectApi";
import Head from "next/head";

const API_URL = process.env.VITE_IMG_URL;

export default function Portfolio() {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();
  const [activeFilter, setActiveFilter] = useState("Frontend");

  const filters = ["Tümü", "Frontend", "Fullstack", "Wordpress"];
  const filteredProjects = useMemo(() => {
    return activeFilter === "Tümü"
      ? projects
      : projects.filter((project) => project.tag === activeFilter);
  }, [projects, activeFilter]);

  return (
    <section id="portfolio" className="bg-dark py-20">
      <Head>
        <title>Portfolyo | Kudret Kırbıyık</title>
        <meta
          name="description"
          content="Kudret Kırbıyık tarafından geliştirilen frontend, fullstack ve WordPress projelerinin portfolyosu."
        />
        <meta property="og:title" content="Portfolyo | Kudret Kırbıyık" />
        <meta
          property="og:description"
          content="Kocaeli web tasarım için geliştirdiğim web projelerine göz atın. Canlı demolar ve GitHub bağlantılarıyla detaylı portfolyo."
        />
        <meta property="og:image" content="/seo-portfolio-thumbnail.jpg" />
      </Head>

      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Örnek <span className="heading-gradient">Projelerim</span>
          </h1>
          <p className="text-body-color max-w-2xl mx-auto">
            Geliştirdiğim bazı özel projeler ve çalışmalar
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {filters.map((filter) => (
            <button
              aria-label={`Filtre: ${filter}`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full border border-border-color transition-all duration-300
                ${
                  activeFilter === filter
                    ? "bg-primary  text-white"
                    : "text-body-color hover:text-white"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="card animate-pulse bg-gray-800 p-4 rounded-lg"
                >
                  <div className="bg-gray-700 h-64 w-full rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-600 w-3/4 mb-2 rounded"></div>
                  <div className="h-4 bg-gray-600 w-1/2 rounded"></div>
                </div>
              ))
            : filteredProjects.map((project) => (
                <div key={project.id} className="card group overflow-hidden">
                  <div className="relative overflow-hidden rounded-lg">
                    <LazyImage
                      src={`${API_URL}${project.image}`}
                      crossOrigin="anonymous"
                      alt={project.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-primary/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.tag === "Wordpress" ? (
                        <a
                          href={project.liveview}
                          target="_blank"
                          className="text-white text-lg font-semibold hover:underline hover:cursor-pointer"
                        >
                          Canlı Görünüm
                        </a>
                      ) : (
                        <>
                          <a
                            href={project.liveview}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-lg font-semibold hover:underline hover:cursor-pointer mb-2"
                          >
                            Canlı Görünüm
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-lg font-semibold hover:underline hover:cursor-pointer"
                          >
                            Kaynak Kodları
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-body-color">{project.tag}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
