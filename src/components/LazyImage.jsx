import { useState, useEffect } from "react";

const LazyImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState("/placeholder.jpg");
  const [imageRef, setImageRef] = useState();

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc === "/placeholder.jpg") {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: "75%",
          }
        );
        observer.observe(imageRef);
      } else {
        // Fallback for older browsers
        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageSrc, imageRef]);
  // Yeni src değiştiğinde hemen güncelle
  useEffect(() => {
    setImageSrc(src);
  }, [src]);
  return (
    <img
      ref={setImageRef}
      crossOrigin="anonymous"
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};
LazyImage.propTypes = undefined;
export default LazyImage;
