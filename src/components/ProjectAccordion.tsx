import { FC, useEffect, useState } from "react";
import IProject from "../models/Project";
import { databases, storage } from "@/lib/appwrite_client";
import { Button } from "./ui/button";
import Trash from "./icon/Trash";
import PencilSquare from "./icon/PencilSquare";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  project: IProject;
  userId?: string;
  getProjects: () => Promise<void>;
};

type DeleteProps = {
  action: () => Promise<void>;
  isDeleting: boolean;
};

const DeletionAlert: FC<DeleteProps> = ({ action, isDeleting }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button isLoading={isDeleting} className="w-28" variant="destructive">
          <Trash />
          Deletar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-sans">
        <AlertDialogHeader>
          <AlertDialogTitle>Apagar projeto?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive"
            onClick={() => action()}
          >
            Apagar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ProjectAccordion: FC<Props> = ({ project, userId, getProjects }) => {
  const [isProjectOpen, setIsProjectOpen] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

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
      setIsDeleting(true);

      const deleteImageRes = await deleteImage(project.image_path);

      if (deleteImageRes) {
        await databases.deleteDocument(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_COLLECTION_ID_PROJECTS,
          project.$id
        );
        getProjects();
      }
    } catch (error) {
      setIsDeleting(false);
      console.error("Erro ao deletar projeto:", error);
    }
  };

  const deleteImage = async (fileId: string): Promise<boolean> => {
    try {
      await storage.deleteFile(import.meta.env.VITE_IMAGE_BUCKET, fileId);
      return true;
    } catch (error) {
      console.error("Erro ao deletar a imagem:", error);
      return false;
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
            <div className="[grid-area:buttons] space-x-2 lg:space-x-0 lg:space-y-2 w-full lg:flex flex-col lg:items-end justify-end">
              <Button className="w-28 bg-muted hover:bg-muted cursor-not-allowed">
                <PencilSquare />
                Editar
              </Button>
              <DeletionAlert action={deleteProject} isDeleting={isDeleting} />
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
