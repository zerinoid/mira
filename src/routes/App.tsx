import { useEffect, useState } from "react";
import "../styles/App.css";
import ProjectAccordion from "../components/ProjectAccordion";
import SliderBio from "../components/SliderBio";
import { databases } from "../lib/appwrite_client";
import IProject from "../models/Project";

/* const projects: Project[] = [
 *   {
 *     number: 2,
 *     category: "Editorial",
 *     details:
 *       "Nulla facilisis, risus a rhoncus fermentum, tellus tellus lacinia purus, et dictum nunc justo sit amet elit.",
 *     additional: "Observações",
 *     title: "Orgulho e resistências: LGBT na ditadura",
 *     body: "Produção editorial de catálogo da exposição no Memorial da Resistência de São Paulo. ",
 *     date: "2020-2021",
 *     client: "Associação Pinacoteca Arte e Cultura",
 *     imagePath: "013_memorial.webp",
 *   },
 *   {
 *     number: 1,
 *     category: "Migração",
 *     title: "Migração de website",
 *     details: "Nullam libero mauris, consequat quis, varius et",
 *     additional: "Obs obs obs",
 *     body: "Alimentação com imagens e conteúdo bilíngue.",
 *     date: "2020",
 *     client: "Zipper Galeria",
 *     imagePath: "012_zipper.webp",
 *   },
 * ]; */

function App() {
  const [projects, setProjects] = useState<IProject[]>();
  const [isBioOpen, setIsBioOpen] = useState<boolean>(false);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID_PROJECTS
    );
    setProjects(response.documents as IProject[]);
  };

  const handleSliderBio = () => setIsBioOpen((prevState) => !prevState);

  return (
    <div className="text-red-500 bg-yellow-100 min-h-screen">
      <SliderBio setIsOpen={setIsBioOpen} isOpen={isBioOpen} />
      <header className="header px-[5px] md:pt-4">
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
      <section className="flex flex-col">
        {projects?.map((project) => (
          <ProjectAccordion key={project.number} project={project} />
        ))}
      </section>
    </div>
  );
}

export default App;
