import { useEffect, useState } from 'react'
import '../styles/App.css'
import ProjectAccordion from '../components/ProjectAccordion'
import SliderBio from '../components/SliderBio'
import { account, databases } from '../lib/appwrite_client'
import IProject from '../models/Project'
import { Models } from 'appwrite'
import NewProject from '@/components/NewProject'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/animation/Spinner'
import MiraLogo from '@/components/icon/MiraLogo'

function App() {
  const [projects, setProjects] = useState<IProject[]>()
  const [user, setUser] = useState<Models.User<Models.Preferences>>()

  const [isBioOpen, setIsBioOpen] = useState<boolean>(false)
  const [isNewProjectOpen, setIsNewProjectOpen] = useState<boolean>(false)

  const [projectsError, setProjectsError] = useState<string>('')
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(true)
  const [nextProjectNumber, setNextProjectNumber] = useState<number>(0)

  useEffect(() => {
    void getProjects()
    void getAccount()
  }, [])

  useEffect(() => {
    isBioOpen
      ? document.querySelector('html')?.classList.add('overflow-hidden')
      : document.querySelector('html')?.classList.remove('overflow-hidden')
  }, [isBioOpen])

  const getAccount = async () => {
    try {
      const accountDetails = await account.get()
      setUser(accountDetails)
    } catch (error) {
      setUser({} as Models.User<Models.Preferences>)
    }
  }

  const handleNextProjectNumber = (projects: IProject[]): number => {
    const projectNumbers = projects.map(project => project.number)
    let nextNumber = projects.length + 1

    while (projectNumbers.includes(nextNumber)) {
      nextNumber++
    }
    return nextNumber
  }

  const getProjects = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID as string,
        import.meta.env.VITE_COLLECTION_ID_PROJECTS as string
      )

      if (!response.documents.length) {
        setProjectsError('Nenhum Projeto encontrado')
      } else {
        setProjectsError('')
      }

      const sortedProjects = response.documents.sort(
        (a, b) => b.number - a.number
      )

      setProjects(sortedProjects as IProject[])
      setIsLoadingProjects(false)
      setNextProjectNumber(
        handleNextProjectNumber(response.documents as IProject[])
      )
    } catch (error) {
      setProjects([])
      const projectsError = 'Erro ao requisitar projetos'
      setProjectsError(projectsError)
      setIsLoadingProjects(false)
      console.error(projectsError + ':', error)
    }
  }

  const logout = async () => {
    try {
      await account.deleteSession('current')
      setUser({} as Models.User<Models.Preferences>)
    } catch (error) {
      console.error('Erro ao deslogar usuário: ', error)
    }
  }

  const handleSliderBio = () => setIsBioOpen(prevState => !prevState)

  return (
    <div className="text-foreground bg-background min-h-screen container relative">
      <SliderBio
        userId={user?.$id}
        setIsOpen={setIsBioOpen}
        isOpen={isBioOpen}
      />
      <header className="header px-[5px] pt-3 md:pt-4">
        <div
          className="[grid-area:title] cursor-pointer"
          onClick={handleSliderBio}
        >
          <div className="w-[20px]">
            <MiraLogo />
          </div>
        </div>

        <div className="[grid-area:user] flex justify-end w-full">
          {user?.$id ? (
            <>
              <p className="mr-5 mt-2 hidden lg:block">
                Bem vinda, {user?.name}
              </p>
              <Button
                className="py-1 px-2 h-7 md:py-2 md:px-4 md:h-10 mr-2"
                onClick={() => setIsNewProjectOpen(prevState => !prevState)}
              >
                Novo Projeto
              </Button>
              <Button
                variant="outline"
                className="border-2 py-1 px-2 h-7 md:py-2 md:px-4 md:h-10"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : null}
        </div>
        <div className="[grid-area:number]">#</div>
        <div className="[grid-area:category] hidden lg:block">Tipo</div>
        <div className="[grid-area:project]">Projeto</div>
        <div className="[grid-area:client] hidden lg:block">Cliente</div>
        <div className="[grid-area:date] justify-self-end">Ano</div>
      </header>
      {/* New Project form --------------------- */}
      {user?.$id && isNewProjectOpen ? (
        <section className="p-2 border-t border-foreground">
          <NewProject
            userId={user.$id}
            getProjects={getProjects}
            setIsNewProjectOpen={setIsNewProjectOpen}
            nextProjectNumber={nextProjectNumber}
          />
        </section>
      ) : null}

      {/* Loading Projects --------------------- */}
      {isLoadingProjects ? (
        <section className="flex flex-col justify-center items-center min-h-[200px]">
          <Spinner size={40} />
        </section>
      ) : projectsError || !projects?.length ? (
        <section className="flex flex-col justify-center items-center min-h-[100px]">
          <p className="text-xl">:(</p>
          <p className="text-xl">{projectsError}</p>
        </section>
      ) : (
        <section className="flex flex-col">
          {projects?.map(project => (
            <ProjectAccordion
              key={project.number}
              project={project}
              userId={user?.$id}
              getProjects={getProjects}
            />
          ))}
        </section>
      )}
    </div>
  )
}

export default App
