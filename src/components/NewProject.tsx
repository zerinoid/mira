import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
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
import { databases } from "@/lib/appwrite_client";
import { ID } from "appwrite";

type Props = {
  userId: string;
  getProjects: () => void;
};

const projectSchema = z.object({
  number: z
    .string({
      required_error: "Obrigatório e maior que 0",
    })
    .min(1),
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
    .max(50)
    .optional(),
  /* image_path: z
   *   .string({
   *     required_error: "Campo obrigatório",
   *   })
   *   .min(6)
   *   .max(50)
   *   .optional(), */
});

const NewProject: FC<Props> = ({ userId, getProjects }) => {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      number: "",
      title: "",
      details: "",
      additional: "",
      body: "",
      date: "",
      client: "",
      user_id: userId,
      /* image_path: "", */
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    try {
      await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID_PROJECTS,
        ID.unique(),
        values
      );

      getProjects();
    } catch (error) {
      console.error("Error ao submeter projeto: ", error);
    }
  };

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
        <div className="[grid-area:category] cursor-pointer w-full">
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
        <div className="[grid-area:divider] cursor-pointer w-full h-4 border-b border-red-500 lg:hidden" />
        <>
          <div className="[grid-area:details] w-full">
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
          <div className="[grid-area:additional] w-full">
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
        <div className="[grid-area:title] cursor-pointer w-full lg:mb-4">
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
        <div className="[grid-area:body] w-full">
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
        <div className="[grid-area:image]">
          {/* <FormField
            control={form.control}
            name="image_path"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
        <div className="[grid-area:date] cursor-pointer justify-self-end text-end pl-2 lg:pl-0">
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

        <Button className="[grid-area:button] w-full self-end" type="submit">
          Enviar
        </Button>
      </form>
    </Form>
  );
};

export default NewProject;
