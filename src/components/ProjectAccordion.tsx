import { FC } from "react";
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
  {
    return (
      <div
        className={`${styles.projectContainer} border-t border-red-500 px-[5px]`}
      >
        <div className={styles.number}>{project.number}</div>
        <div className={styles.category}>{project.category}</div>
        <div className={styles.divider} />
        <div className={styles.details}>{project.details}</div>
        <div className={styles.additional}>{project.additional}</div>
        <div className={styles.title}>{project.title}</div>
        <div className={styles.text}>{project.text}</div>
        <div className={styles.image}>
          <img alt={project.title} src={project.imagePath} />
        </div>
        <div className={styles.client}>{project.client}</div>
        <div className={styles.date}>{project.date}</div>
      </div>
    );
  }
};

export default ProjectAccordion;
