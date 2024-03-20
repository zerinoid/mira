import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { databases, storage } from "@/lib/appwrite_client";
import { ID } from "appwrite";

type Props = {
  userId: string;
  getProjects: () => void;
  setIsNewProjectOpen: Dispatch<SetStateAction<boolean>>;
  nextProjectNumber: number;
};

const MB_BYTES = 1000000; // 1 megabyte

const ACCEPTED_MIME_TYPES = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

const imageSchema = z.instanceof(FileList).superRefine((f, ctx) => {
  const file = f[0];

  // check mime type
  if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Formatos aceitos: [${ACCEPTED_MIME_TYPES.join(", ")}] mas é ${
        file.type
      }`,
    });
  }
  // check file size
  if (file.size > 3 * MB_BYTES) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      type: "array",
      message: `Limite de 3mb para arquivos, esse tem ${(
        file.size / MB_BYTES
      ).toFixed(2)}mb`,
      maximum: 3 * MB_BYTES,
      inclusive: true,
    });
  }
});

const projectSchema = z.object({
  number: z
    .number({
      required_error: "Obrigatório e maior que 0",
    })
    .min(1, { message: "Obrigatório e maior que 0" }),
  category: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(5, { message: "Deve ter mais de 5 caracteres" })
    .max(30),
  title: z
    .string({
      required_error: "Campo brigatório",
    })
    .min(1)
    .max(50),
  details: z.string().min(0).max(100).optional(),
  additional: z.string().min(0).max(50).optional(),
  body: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(10, { message: "Deve ter mais de 10 caracteres" })
    .max(1000),
  date: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(4, { message: "Deve ter mais de 4 caracteres" })
    .max(15),
  client: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(5, { message: "Deve ter mais de 5 caracteres" })
    .max(50),
  user_id: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(6, { message: "Deve ter mais de 6 caracteres" })
    .max(50),
  image_path: z.string().optional(),
  file: imageSchema.optional(),
});

const NewProject: FC<Props> = ({
  userId,
  getProjects,
  setIsNewProjectOpen,
  nextProjectNumber,
}) => {
  const [file, setFile] = useState<File | undefined>();
  const [isLoadingNewProject, setIsLoadingNewProject] =
    useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      number: nextProjectNumber,
      category: "",
      title: "",
      details: "",
      additional: "",
      body: "",
      date: "",
      client: "",
      user_id: userId,
      image_path: "",
      file: undefined,
    },
  });

  const fileRef = form.register("file");

  const onChangeImage = (e: FormEvent<HTMLInputElement>) => {
    const target = e?.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);

    const file = new FileReader();
    file.onload = () => {
      setFilePreview(file.result);
    };

    file.readAsDataURL(target.files[0]);
  };

  const uploadImage = async () => {
    try {
      if (file) {
        return await storage.createFile(
          import.meta.env.VITE_IMAGE_BUCKET,
          ID.unique(),
          file
        );
      } else {
        throw new Error("Arquivo não carregado");
      }
    } catch (error) {
      throw new Error("Erro no upload da imagem");
    }
  };

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    try {
      setIsLoadingNewProject(true);
      const imageResponse = await uploadImage();

      if (typeof imageResponse === "undefined") {
        throw new Error("Upload de imagem falhou");
      }

      delete values.file;
      const project = { ...values, image_path: imageResponse.$id };

      await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID_PROJECTS,
        ID.unique(),
        project
      );

      form.reset();
      getProjects();
      setIsLoadingNewProject(false);
      setIsNewProjectOpen(false);
    } catch (error) {
      setIsLoadingNewProject(false);
      console.error("Erro ao submeter projeto: ", error);
    }
  };
  /*
   *   const clearImage = () => {
   *     setFile(undefined);
   *     setFilePreview(undefined);
   *   };
   *  */
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="project gap-y-2 lg:gap-y-0"
      >
        <div className="[grid-area:number] cursor-pointer pr-2">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nº</FormLabel>
                <FormControl>
                  <Input
                    className="pl-[6px] pr-0 lg:px-3"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="[grid-area:category] cursor-pointer w-full lg:pr-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="[grid-area:divider] cursor-pointer w-full h-4 border-b border-foreground lg:hidden" />
        <>
          <div className="[grid-area:details] w-full lg:pr-2">
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detalhes</FormLabel>
                  <FormControl>
                    <Textarea rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="[grid-area:additional] w-full lg:pr-2">
            <FormField
              control={form.control}
              name="additional"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
        <div className="[grid-area:title] cursor-pointer w-full lg:mb-4 lg:pr-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="[grid-area:body] w-full lg:pr-2">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Corpo</FormLabel>
                <FormControl>
                  <Textarea rows={7} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="[grid-area:image] flex w-full items-end">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <Input
                    className="file:text-foreground"
                    id="uploader"
                    type="file"
                    {...fileRef}
                    onChange={(e) => field.onChange(onChangeImage(e))}
                    accept="image/png, image/webp, image/jpg, image/jpeg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {filePreview ? (
            <div className="w-[200px] ml-2">
              <img alt="Preview da imagem" src={filePreview as string} />
            </div>
          ) : null}
        </div>
        <div className="[grid-area:client] cursor-pointer w-full">
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="[grid-area:date] cursor-pointer justify-self-end text-end pl-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano</FormLabel>
                <FormControl>
                  <Input className="px-[3px] lg:px-3" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} value={userId} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          isLoading={isLoadingNewProject}
          className="[grid-area:button] w-full self-end"
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
};

export default NewProject;
