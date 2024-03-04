import "./App.css";
import ProjectAccordion, { Project } from "./components/ProjectAccordion";

const projects: Project[] = [
  {
    number: 1,
    title:
      "Associação Pinacoteca Arte e Cultura _ Orgulho e resistências: LGBT na ditadura",
    text: "Produção editorial de catálogo da exposição no Memorial da Resistência de São Paulo. ",
    date: "novembro 2020-janeiro 2021 ",
    imagePath: "013_memorial.webp",
  },
];

function App() {
  return (
    <>
      <header>Mira</header>
      <section>
        Projetos
        {projects.map((project) => (
          <ProjectAccordion project={project} />
        ))}
      </section>
    </>
  );
}

export default App;
