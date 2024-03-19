import { databases } from "@/lib/appwrite_client";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

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

const SliderBio: FC<Props> = ({ isOpen, setIsOpen }) => {
  const [bioText, setBioText] = useState<string>("");
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);

  const form = useForm<z.infer<typeof bioSchema>>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio: "",
    },
  });

  useEffect(() => {
    getBio();
  }, []);

  const getBio = async () => {
    try {
      const response = await databases.getDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID_BIO,
        import.meta.env.VITE_DOCUMENT_ID_BIO
      );
      setBioText(response.bio);
    } catch (error) {
      console.log("Erro ao recuperar a bio: ", error);
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
        <span>Mira</span> <CloseIcon />
      </header>
      {isEditingBio ? (
        <Form {...form}>
          <form className="mb-12 text-foreground flex flex-col">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea className="w-full" rows={15} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button onClick={() => setIsEditingBio(false)} variant="outline" />
            <Button
              className="self-end text-foreground"
              variant="outline"
              type="submit"
            >
              Enviar
            </Button>
          </form>
        </Form>
      ) : (
        <p className="mb-12">{bioText}</p>
      )}
      <p>Sed id ligula quis est convallis tempor.</p>
      <a href="mailto:mira@mira.etc.br">mira@mira.etc.br</a>
    </aside>
  );
};

export default SliderBio;
