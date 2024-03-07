import { FC, useState } from "react";
import styles from "./ProjectAccordion.module.css";

type Props = {
  project: Project;
};

export type Project = {
  number: number;
  category: string;
  details?: string;
  additional?: string;
  title: string;
  text: string;
  date: string;
  client: string;
  imagePath: string;
};

const ProjectAccordion: FC<Props> = ({ project }) => {
  const [isProjectOpen, setIsProjectOpen] = useState<boolean>(false);

  const opener = () => setIsProjectOpen((prevState) => !prevState);

  {
    return (
      <div
        className={`${styles.projectContainer} border-t border-red-500 px-[5px]`}
      >
        <div
          className="[grid-area:number] cursor-pointer w-full"
          onClick={opener}
        >
          {project.number}
        </div>
        <div
          className="[grid-area:category] cursor-pointer w-full"
          onClick={opener}
        >
          {project.category}
        </div>
        {isProjectOpen && (
          <div
            className="[grid-area:divider] cursor-pointer w-full h-4 border-b border-red-500 lg:hidden"
            onClick={opener}
          />
        )}
        {isProjectOpen && (
          <>
            <div className="[grid-area:details] mb-6 lg:mb-0">
              {project.details}
            </div>
            <div className="[grid-area:additional] mb-6">
              {project.additional}
            </div>
          </>
        )}
        <div
          className="[grid-area:title] cursor-pointer w-full md:mb-4"
          onClick={opener}
        >
          {project.title}
        </div>
        {isProjectOpen && (
          <>
            <div className="[grid-area:text] mb-6">{project.text}</div>
            <div className="[grid-area:image]">
              <img alt={project.title} src={project.imagePath} />
            </div>
          </>
        )}
        <div
          className="[grid-area:client] cursor-pointer w-full"
          onClick={opener}
        >
          {project.client}
        </div>
        <div
          className="[grid-area:date] cursor-pointer w-full justify-self-end text-end"
          onClick={opener}
        >
          {project.date}
        </div>
      </div>
    );
  }
};

export default ProjectAccordion;
