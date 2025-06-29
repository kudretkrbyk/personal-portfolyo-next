import SkillBar from "./SkillBar";
import data from "./Data/datas";
export default function Resume() {
  const { experiences, education, skills } = data;
  return (
    <section id="resume" className="section bg-dark min-h-screen">
      <div className="container">
        <div className="flex flex-col items-center pb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white pb-4">
            Deneyim ve <span className="heading-gradient">Eğitim</span>
          </h2>
          <p className="text-body-color max-w-2xl text-center">
            Profesyonel deneyimlerim ve eğitim geçmişim
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* İş Deneyimi */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-2xl font-bold text-white pb-4">İş Deneyimi</h3>
            {experiences.map((exp, index) => (
              <div key={index} className="card p-6 flex flex-col space-y-4">
                <span className="text-primary text-sm font-medium">
                  {exp.period}
                </span>
                <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                <p className="text-primary">{exp.company}</p>
                <p className="text-body-color">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Eğitim */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-2xl font-bold text-white pb-4">Eğitim</h3>
            {education.map((edu, index) => (
              <div key={index} className="card p-6 flex flex-col space-y-4">
                <span className="text-primary text-sm font-medium">
                  {edu.period}
                </span>
                <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                <p className="text-primary">{edu.school}</p>
                <p className="text-body-color">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Yetenekler */}
        <div className="pt-12">
          <h3 className="text-2xl font-bold text-white pb-8 text-center">
            Yetenekler
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
