import { useEffect, useState } from "react";
import "../styles/App.css";
import ProjectAccordion from "../components/ProjectAccordion";
import SliderBio from "../components/SliderBio";
import { account, databases } from "../lib/appwrite_client";
import IProject from "../models/Project";
import { Models } from "appwrite";
import NewProject from "@/components/NewProject";
import { Link } from "react-router-dom";

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
  const [user, setUser] = useState<Models.User<Models.Preferences>>();

  useEffect(() => {
    getProjects();
    getAccount();
  }, []);

  const getAccount = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      setUser({} as Models.User<Models.Preferences>);
    }
  };

  const getProjects = async () => {
    //TODO ERROR HANDLING
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID_PROJECTS
    );
    setProjects(response.documents as IProject[]);
  };

  const handleSliderBio = () => setIsBioOpen((prevState) => !prevState);

  return (
    <div className="text-red-500 bg-yellow-100 min-h-screen container">
      <SliderBio setIsOpen={setIsBioOpen} isOpen={isBioOpen} />
      <header className="header px-[5px] md:pt-4">
        <div className="logo"></div>
        <div className="title cursor-pointer" onClick={handleSliderBio}>
          Mira
        </div>
        <div className="[grid-area:user]">
          <Link to="login">LOGIN</Link>
        </div>
        <div className="head-number">#</div>
        <div className="head-category">Tipo</div>
        <div className="head-project">Projeto</div>
        <div className="head-client">Cliente</div>
        <div className="head-date">Ano</div>
      </header>
      {user?.$id ? (
        <section className="p-2 border-t border-red-500 ">
          <p>Novo Projeto: </p>
          <NewProject userId={user.$id} getProjects={getProjects} />
        </section>
      ) : null}
      <section className="flex flex-col">
        {projects?.map((project) => (
          <ProjectAccordion key={project.number} project={project} />
        ))}
      </section>
    </div>
  );
}

export default App;
