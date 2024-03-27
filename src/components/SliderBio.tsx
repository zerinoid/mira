import { databases } from '@/lib/appwrite_client'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Textarea } from './ui/textarea'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  /* FormLabel, */
  FormMessage
} from '@/components/ui/form'
import { Button } from './ui/button'
import { Models } from 'appwrite'
import MiraLogo from './icon/MiraLogo'
import { bioSchema } from '@/lib/validation/bio'

type Props = {
  userId: string | undefined
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface Bio {
  bio: string
}

const CloseIcon = () => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-background"
  >
    <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313" />
  </svg>
)

const SliderBio: FC<Props> = ({ userId, isOpen, setIsOpen }) => {
  const [bioText, setBioText] = useState<string>('')
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false)
  const [isLoadingSubmission, setIsLoadingSubmission] = useState<boolean>(false)

  const form = useForm<z.infer<typeof bioSchema>>({
    resolver: zodResolver(bioSchema),
    defaultValues: async () => getBio()
  })

  const getBio = async (): Promise<Bio> => {
    try {
      const response = await databases.getDocument(
        import.meta.env.VITE_DATABASE_ID as string,
        import.meta.env.VITE_COLLECTION_ID_BIO as string,
        import.meta.env.VITE_DOCUMENT_ID_BIO as string
      )
      setBioText(response.bio as string)

      return response as Models.Document & Bio
    } catch (error) {
      const err = 'Erro ao recuperar o texto da bio'
      setBioText(err)
      console.log(err + ':', error)
      return { bio: '' }
    }
  }

  const onSubmit = async (values: z.infer<typeof bioSchema>) => {
    try {
      setIsLoadingSubmission(true)
      const response = await databases.updateDocument(
        import.meta.env.VITE_DATABASE_ID as string,
        import.meta.env.VITE_COLLECTION_ID_BIO as string,
        import.meta.env.VITE_DOCUMENT_ID_BIO as string,
        {
          bio: values.bio
        }
      )

      setBioText(response.bio as string)
      setIsEditingBio(false)
      setIsLoadingSubmission(false)
    } catch (error) {
      setIsLoadingSubmission(false)
      console.error('Error ao editar bio: ', error)
    }
  }

  const onCloseSlider = () => {
    setIsOpen(isOpen => !isOpen)
    /* setIsEditingBio(false); */
  }

  return (
    <aside
      className={`${
        isOpen ? 'grid' : 'hidden'
      } z-10 font-sans absolute top-0 left-0 text-background min-h-screen grid-cols-[5px_5fr_35fr_13fr] md:grid-cols-[5px_5fr_28fr_20fr] lg:grid-cols-[5px_3fr_20fr_43fr] bg-gradient-to-r from-foreground to-transparent to-30% w-full`}
    >
      <div className="PADDING" />
      <div className="bg-foreground pt-3 md:pt-4 DUMMY" />
      <div className="bg-foreground pt-3 md:pt-4 pr-4 md:pr-7">
        <header
          className="flex justify-between items-start mb-8 cursor-pointer"
          onClick={onCloseSlider}
        >
          <div className="w-[20px]">
            <MiraLogo invert />
          </div>
          <CloseIcon />
        </header>
        {isEditingBio ? (
          <Form {...form}>
            <form
              className="flex flex-col mb-12 text-foreground"
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
      </div>
      <div className="CLOSE" onClick={onCloseSlider}></div>
    </aside>
  )
}

export default SliderBio
