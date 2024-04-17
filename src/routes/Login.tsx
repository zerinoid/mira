import { Button } from '@/components/ui/button'
import { FC, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  /* FormDescription, */
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { account } from '@/lib/appwrite_client'
import { useNavigate } from 'react-router-dom'
import { AppwriteException } from 'appwrite'

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Endereço de mail inválido' })
    .min(5)
    .max(30),
  password: z.string()
})

const Login: FC = () => {
  const navigate = useNavigate()
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(true)

  useEffect(() => {
    void getAccount()
  }, [])

  const getAccount = async () => {
    try {
      await account.get()
      navigate('/')
    } catch (error) {
      setIsLoadingLogin(false)
    }
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async function (values: z.infer<typeof loginSchema>) {
    try {
      setIsLoadingLogin(true)
      await account.createEmailSession(values.email, values.password)
      navigate('/')
    } catch (error) {
      if (error instanceof AppwriteException) {
        if (
          error.type === 'general_argument_invalid' ||
          error.type === 'user_invalid_credentials'
        ) {
          form.setError('password', {
            type: 'manual',
            message: 'Credenciais inválidas'
          })
        } else if (error.code === 429) {
          form.setError('password', {
            type: 'manual',
            message: 'Limite de tentativas excedido, espere alguns minutos.'
          })
        } else if (error.code === 500) {
          form.setError('password', {
            type: 'manual',
            message: 'Erro de conexão com o servidor'
          })
        } else {
          form.setError('password', {
            type: 'manual',
            message: error.message
          })
        }
      } else {
        form.setError('password', {
          type: 'manual',
          message: 'Erro genérico, favor contactar o administrador'
        })
      }
      setIsLoadingLogin(false)
    }
  }

  return (
    <section className="flex flex-col pt-16 md:p-0 md:justify-center space-y-10 items-center h-screen bg-background">
      <div>
        <img
          className="w-[100px] md:w-[unset]"
          alt="Logo Mira"
          src="MIRA2024.png"
        />
      </div>
      <div className="w-[194.5px]">
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
  )
}

export default Login
