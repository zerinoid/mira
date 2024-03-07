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
        <div className={styles.number} onClick={opener}>
          {project.number}
        </div>
        <div className={styles.category} onClick={opener}>
          {project.category}
        </div>
        {isProjectOpen && <div className={styles.divider} onClick={opener} />}
        {isProjectOpen && (
          <>
            <div className={styles.details}>{project.details}</div>
            <div className={styles.additional}>{project.additional}</div>
          </>
        )}
        <div className={styles.title} onClick={opener}>
          {project.title}
        </div>
        {isProjectOpen && (
          <>
            <div className={styles.text}>{project.text}</div>
            <div className={styles.image}>
              <img alt={project.title} src={project.imagePath} />
            </div>
          </>
        )}
        <div className={styles.client} onClick={opener}>
          {project.client}
        </div>
        <div className={styles.date} onClick={opener}>
          {project.date}
        </div>
      </div>
    );
  }
};

export default ProjectAccordion;
