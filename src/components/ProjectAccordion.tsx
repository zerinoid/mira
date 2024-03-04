import { FC } from "react";

type Props = {
  project: Project;
};

export type Project = {
  number: number;
  title: string;
  text: string;
  date: string;
  imagePath: string;
};

const ProjectAccordion: FC<Props> = ({ project }) => {
  return (
    <div>
      <div>{project.number}</div>
      <div>{project.title}</div>
      <div>{project.text}</div>
      <div>
        <img alt={project.title} src={project.imagePath} />
      </div>
      <div>{project.date}</div>
    </div>
  );
};

export default ProjectAccordion;
