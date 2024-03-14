import { FC } from "react";
import NewProject from "../components/NewProject";

const Admin: FC = () => {
  return (
    <div className="text-white bg-black min-h-screen container">
      <header className="header px-[5px] md:pt-4">
        <div className="logo"></div>
        <div className="title cursor-pointer">Mira</div>
        <div className="head-number">#</div>
        <div className="head-category">Tipo</div>
        <div className="head-project">Projeto</div>
        <div className="head-client">Cliente</div>
        <div className="head-date">Ano</div>
      </header>
      <section>
        <NewProject />
      </section>
    </div>
  );
};

export default Admin;
