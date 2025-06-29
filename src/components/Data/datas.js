import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { RiMapPin2Fill } from "react-icons/ri";

const experiences = [
  {
    title: "Web Developer",
    company: "Freelance",
    period: "2024 - Şimdi",
    description:
      "React ile fronted ve Node.js ile backend geliştirme üzerine freelance çalışmalar, Wordpress altyapılı web sitesi geliştirme.",
  },
  {
    title: "Fullstack Developer Intern",
    company: "ARİS888",
    period: "2024 - 2024",
    description: "Yapay Zeka Destekli Canlı Destek Modülü Geliştirme.",
  },
  {
    title: "Web Designer",
    company: "Freelance",
    period: "2020 - 2023",
    description: "Wordperss Altyapılı Web Sitesi Geliştirme ",
  },
];

const education = [
  {
    degree: "Bilgisayar Mühendisliği",
    school: "Sakarya Uygulamalı Bilimler Üniversitesi",
    period: "2020 - 2024",
    description:
      "Yazılım geliştirme, algoritma ve veri yapıları üzerine eğitim.",
  },
  {
    degree: "Endüstri Mühendisliği",
    school: "MSÜ Kara Harp Okulu",
    period: "2009-2013",
    description:
      "Endüstri mühendisliği üzerine eğitim, işletme, üretim ve kalite/personel yönetimi üzerine eğitim.",
  },
];

const skills = [
  { name: "React.js", level: 85 },
  { name: "Node.js", level: 70 },
  { name: "JavaScript", level: 75 },
  { name: "TypeScript", level: 50 },
  { name: "HTML/CSS", level: 90 },
  { name: "MongoDB", level: 70 },
  { name: "PostgreSQL", level: 70 },
  { name: "MariaDB", level: 70 },
  { name: "TailwindCSS", level: 90 },
  { name: "Wordpress", level: 90 },
];

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/kudretkrbyk",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kudret-kirbiyik/",
    icon: FaLinkedin,
  },
  {
    name: "Map",
    url: "https://g.co/kgs/u6px54Q",
    icon: RiMapPin2Fill,
  },
];
export default { experiences, education, skills, socialLinks };
