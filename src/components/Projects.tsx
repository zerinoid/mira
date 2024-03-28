import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import '../styles/App.css'
import ProjectAccordion from '../components/ProjectAccordion'
import { account, databases } from '../lib/appwrite_client'
import IProject from '../models/Project'
import NewProject from '@/components/NewProject'
import Spinner from '@/components/animation/Spinner'
import UserType from '@/models/User'

type Props = {
  setUser: Dispatch<SetStateAction<UserType>>
  user: UserType
  setIsNewProjectOpen: Dispatch<SetStateAction<boolean>>
  isNewProjectOpen: boolean
}

const Projects: FC<Props> = ({
  setUser,
  user,
  setIsNewProjectOpen,
  isNewProjectOpen
}) => {
  const [projects, setProjects] = useState<IProject[]>()
  const [projectsError, setProjectsError] = useState<string>('')
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(true)
  const [nextProjectNumber, setNextProjectNumber] = useState<number>(0)

  useEffect(() => {
    void getProjects()
    void getAccount()
  }, [])

  const getAccount = async () => {
    try {
      const accountDetails = await account.get()
      setUser(accountDetails)
    } catch (error) {
      setUser({} as UserType)
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

  return (
    <>
      <main className="text-foreground bg-background envelope">
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
            <Spinner size={11} />
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
      </main>
    </>
  )
}

export default Projects
