import { FC } from "react";
import styles from "./ProjectAccordion.module.css";

const NewProject: FC = () => {
  return (
    <div
      className={`${styles.projectContainer} border-t border-red-500 px-[5px]`}
    >
      <p>Novo Projeto: </p>
      <div className="[grid-area:number] cursor-pointer w-full">
        <input name="number" type="number" />
      </div>
      <div className="[grid-area:category] cursor-pointer w-full">
        <input className="bg-yellow-100" name="category" type="text" value="" />
      </div>
      <div className="[grid-area:divider] cursor-pointer w-full h-4 border-b border-red-500 lg:hidden" />
      <>
        <div className="[grid-area:details] mb-6 lg:mb-0">
          <input name="details" type="text" value="" />
        </div>
        <div className="[grid-area:additional] mb-6">
          <input name="additional" type="text" value="" />
        </div>
      </>
      <div className="[grid-area:title] cursor-pointer w-full md:mb-4">
        <input name="title" type="text" value="" />
      </div>
      <div className="[grid-area:body] mb-6">
        <input name="body" type="text" value="" />
      </div>
      <div className="[grid-area:image]">
        <img alt="temp" src="/013_memorial.webp" />
      </div>
      <div className="[grid-area:client] cursor-pointer w-full">
        <input name="client" type="text" value="" />
      </div>
      <div className="[grid-area:date] cursor-pointer w-full justify-self-end text-end">
        <input name="date" type="text" value="" />
      </div>
    </div>
  );
};

export default NewProject;
