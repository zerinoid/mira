import { databases } from "@/lib/appwrite_client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  /* FormLabel, */
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Models } from "appwrite";
import MiraLogo from "./icon/MiraLogo";

type Props = {
  userId: string | undefined;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

interface Bio {
  bio: string;
}

const bioSchema = z.object({
  bio: z
    .string()
    .min(200, { message: "Mínimo de 200 caracteres" })
    .max(800, { message: "Máximo de 800 caracteres" }),
});

const CloseIcon = () => (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-background"
  >
    <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313" />
  </svg>
);

const SliderBio: FC<Props> = ({ userId, isOpen, setIsOpen }) => {
  const [bioText, setBioText] = useState<string>("");
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);
  const [isLoadingSubmission, setIsLoadingSubmission] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof bioSchema>>({
    resolver: zodResolver(bioSchema),
    defaultValues: async () => getBio(),
  });

  const getBio = async (): Promise<Bio> => {
    try {
      const response = await databases.getDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID_BIO,
        import.meta.env.VITE_DOCUMENT_ID_BIO
      );
      setBioText(response.bio);

      return response as Models.Document & Bio;
    } catch (error) {
      const err = "Erro ao recuperar o texto da bio";
      setBioText(err);
      console.log(err + ":", error);
      return { bio: "" };
    }
  };

  const onSubmit = async (values: z.infer<typeof bioSchema>) => {
    try {
      setIsLoadingSubmission(true);
      const response = await databases.updateDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID_BIO,
        import.meta.env.VITE_DOCUMENT_ID_BIO,
        {
          bio: values.bio,
        }
      );

      setBioText(response.bio);
      setIsEditingBio(false);
      setIsLoadingSubmission(false);
    } catch (error) {
      setIsLoadingSubmission(false);
      console.error("Error ao editar bio: ", error);
    }
  };

  return (
    <aside
      className={`${
        isOpen ? "block" : "hidden"
      } fixed top-0 left-0 text-background bg-foreground pl-12 pr-3 md:pt-4 lg:pl-16 lg:pr-7 border-r w-[85vw] md:w-1/2 lg:w-1/3 h-screen pt-3`}
    >
      <header
        className="flex justify-between items-center mb-12 cursor-pointer"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <div className="w-[20px]">
          <MiraLogo fill="background" />
        </div>
        <CloseIcon />
      </header>
      {isEditingBio ? (
        <Form {...form}>
          <form
            className="mb-12 text-foreground"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="mb-8">
                  {/* <FormLabel>Bio</FormLabel> */}
                  <FormControl>
                    <Textarea
                      wrap="hard"
                      className="w-full"
                      rows={15}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                className="self-end bg-foreground text-background border-background w-1/4"
                variant="outline"
                onClick={() => setIsEditingBio(false)}
              >
                Cancelar
              </Button>
              <Button
                className="text-foreground self-end w-1/4 ml-3"
                variant="outline"
                type="submit"
                isLoading={isLoadingSubmission}
              >
                Enviar
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col mb-12">
          <p className="mb-6 whitespace-pre-line">{bioText}</p>
          {userId ? (
            <Button
              variant="outline"
              className="text-foreground self-end"
              onClick={() => setIsEditingBio(true)}
            >
              Editar
            </Button>
          ) : null}
        </div>
      )}
      <p>Para saber mais favor entrar em contato</p>
      <a href="mailto:mira@mira.etc.br">mira@mira.etc.br</a>
    </aside>
  );
};

export default SliderBio;
