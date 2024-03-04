import { FC } from "react";
import styles from "./ProjectAccordion.module.css";

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
  {
    return (
      <div className={`${styles.projectContainer} border-t border-red-500`}>
        <div className={styles.number}>{project.number}</div>
        <div className={styles.title}>{project.title}</div>
        <div className={styles.text}>{project.text}</div>
        <div className={styles.image}>
          <img alt={project.title} src={project.imagePath} />
        </div>
        <div className={styles.date}>{project.date}</div>
      </div>
    );
  }
};

export default ProjectAccordion;
