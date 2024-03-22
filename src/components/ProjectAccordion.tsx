import { FC, useEffect, useState } from "react";
import IProject from "../models/Project";
import { databases, storage } from "@/lib/appwrite_client";
import { Button } from "./ui/button";
import Trash from "./icon/Trash";
import PencilSquare from "./icon/PencilSquare";

type Props = {
  project: IProject;
  userId?: string;
};

const ProjectAccordion: FC<Props> = ({ project, userId }) => {
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

  const deleteProject = async () => {
    try {
      const response = await databases.deleteDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID_PROJECTS,
        project.$id
      );

      console.log({ response });
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
    }
  };

  return (
    <div className="project border-t border-foreground px-[5px]">
      <div className="[grid-area:number] accordionTitleBar" onClick={opener}>
        {project.number}
      </div>
      <div className="[grid-area:category] accordionTitleBar" onClick={opener}>
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
        className="[grid-area:title] accordionTitleBar md:mb-4"
        onClick={opener}
      >
        {project.title}
      </div>
      {isProjectOpen && (
        <>
          <div className="[grid-area:body] mb-6 lg:pr-2">{project.body}</div>
          <div className="[grid-area:image] mb-6 lg:mb-0">
            <img alt={project.title} src={imagePath} />
          </div>
          {userId ? (
            <div className="[grid-area:buttons] w-full lg:flex flex-col lg:items-end justify-end">
              <Button className="mr-4 lg:mr-0 lg:w-28 bg-muted hover:bg-muted cursor-not-allowed">
                <PencilSquare />
                Editar
              </Button>
              <Button
                className="lg:w-28 lg:mt-2"
                variant="destructive"
                onClick={deleteProject}
              >
                <Trash />
                Deletar
              </Button>
            </div>
          ) : null}
        </>
      )}
      <div className="[grid-area:client] accordionTitleBar" onClick={opener}>
        {project.client}
      </div>
      <div
        className="[grid-area:date] accordionTitleBar justify-self-end text-end"
        onClick={opener}
      >
        {project.date}
      </div>
    </div>
  );
};

export default ProjectAccordion;
