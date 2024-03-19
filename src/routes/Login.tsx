import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  /* FormDescription, */
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { account } from "@/lib/appwrite_client";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Endereço de mail inválido" })
    .min(5)
    .max(30),
  password: z.string(),
});

const Login: FC = () => {
  const navigate = useNavigate();
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(true);

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    try {
      await account.get();
      navigate("/");
    } catch (error) {
      setIsLoadingLogin(false);
    }
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async function (values: z.infer<typeof loginSchema>) {
    try {
      setIsLoadingLogin(true);
      await account.createEmailSession(values.email, values.password);
      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);
      setIsLoadingLogin(false);
    }
  };

  return (
    <section className="flex flex-col pt-16 md:p-0 md:justify-center space-y-10 items-center h-screen bg-background">
      <div>
        <img
          className="w-[100px] md:w-[unset]"
          alt="Logo Mira"
          src="MIRA2024.png"
        />
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="usuario@email.com.br"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              isLoading={isLoadingLogin}
              className="w-full mt-4"
              type="submit"
            >
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Login;
