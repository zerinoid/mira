import "./App.css";
import ProjectAccordion, { Project } from "./components/ProjectAccordion";

const projects: Project[] = [
  {
    number: 1,
    title:
      "Associação Pinacoteca Arte e Cultura _ Orgulho e resistências: LGBT na ditadura",
    text: "Produção editorial de catálogo da exposição no Memorial da Resistência de São Paulo. ",
    date: "2020-2021",
    imagePath: "013_memorial.webp",
  },
];

function App() {
  return (
    <>
      <header className="header px-[2px]">
        <div className="logo"></div>
        <div className="title">Mira</div>
        <div className="head-number">#</div>
        <div className="head-project">Projeto</div>
        <div className="head-date">Ano</div>
      </header>
      <section className="projects">
        {projects.map((project) => (
          <ProjectAccordion project={project} />
        ))}
      </section>
    </>
  );
}

export default App;
