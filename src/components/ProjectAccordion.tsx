import { FC, useEffect, useState } from "react";
import IProject from "../models/Project";
import { storage } from "@/lib/appwrite_client";

type Props = {
  project: IProject;
};

const ProjectAccordion: FC<Props> = ({ project }) => {
  const [isProjectOpen, setIsProjectOpen] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>("");

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const result = storage.getFileView(
      import.meta.env.VITE_IMAGE_BUCKET,
      project.image_path
    );

    setImagePath(result.href);
  };

  const opener = () => setIsProjectOpen((prevState) => !prevState);

  {
    return (
      <div className="project border-t border-foreground px-[5px]">
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
            className="[grid-area:divider] cursor-pointer w-full h-4 border-b border-foreground lg:hidden"
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
            <div className="[grid-area:body] mb-6 pr-2">{project.body}</div>
            <div className="[grid-area:image]">
              <img alt={project.title} src={imagePath} />
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
