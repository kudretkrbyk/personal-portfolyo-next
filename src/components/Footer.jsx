import data from "./Data/datas";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { socialLinks } = data;

  return (
    <footer className="bg-card-dark border-t border-border-color ">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <a href="#home" className="text-2xl font-bold heading-gradient">
              KUDRET KIRBIYIK
            </a>
            <p className="text-body-color mt-2">
              &copy; {currentYear} Tüm hakları saklıdır.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon; // İkon bileşenini alıyoruz
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-color hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="size-7" />{" "}
                  {/* İkon bileşenini burada render ediyoruz */}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
