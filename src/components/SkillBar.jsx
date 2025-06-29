import { useState, useRef, useEffect } from "react";

export default function SkillBar({ skill }) {
  const [width, setWidth] = useState(0);
  const skillRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setWidth(skill.level);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => {
      if (skillRef.current) {
        observer.unobserve(skillRef.current);
      }
    };
  }, [skill.level]);

  return (
    <div className="card" ref={skillRef}>
      <div className="flex justify-between p-2">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-primary">{width}%</span>
      </div>
      <div className="w-full h-2 bg-border-color rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-[#ff014f] rounded-full transition-all duration-[2000ms] ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
SkillBar.propTypes = undefined;
