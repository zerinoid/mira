import { useState } from "react";
import "./App.css";
import ProjectAccordion, { Project } from "./components/ProjectAccordion";
import SliderBio from "./components/SliderBio";

const projects: Project[] = [
  {
    number: 2,
    category: "Editorial",
    details:
      "Nulla facilisis, risus a rhoncus fermentum, tellus tellus lacinia purus, et dictum nunc justo sit amet elit.",
    additional: "Observações",
    title: "Orgulho e resistências: LGBT na ditadura",
    text: "Produção editorial de catálogo da exposição no Memorial da Resistência de São Paulo. ",
    date: "2020-2021",
    client: "Associação Pinacoteca Arte e Cultura",
    imagePath: "013_memorial.webp",
  },
  {
    number: 1,
    category: "Migração",
    title: "Migração de website",
    details: "Nullam libero mauris, consequat quis, varius et",
    additional: "Obs obs obs",
    text: "Alimentação com imagens e conteúdo bilíngue.",
    date: "2020",
    client: "Zipper Galeria",
    imagePath: "012_zipper.webp",
  },
];

function App() {
  const [isBioOpen, setIsBioOpen] = useState<boolean>(false);

  const handleSliderBio = () => setIsBioOpen((prevState) => !prevState);

  return (
    <>
      <SliderBio setIsOpen={setIsBioOpen} isOpen={isBioOpen} />
      <header className="header px-[5px]">
        <div className="logo"></div>
        <div className="title cursor-pointer" onClick={handleSliderBio}>
          Mira
        </div>
        <div className="head-number">#</div>
        <div className="head-category">Tipo</div>
        <div className="head-project">Projeto</div>
        <div className="head-client">Cliente</div>
        <div className="head-date">Ano</div>
      </header>
      <section className="projects">
        {projects.map((project) => (
          <ProjectAccordion key={project.number} project={project} />
        ))}
      </section>
    </>
  );
}

export default App;
