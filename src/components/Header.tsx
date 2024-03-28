import { Dispatch, FC, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import MiraLogo from '@/components/icon/MiraLogo'
import { account } from '@/lib/appwrite_client'
import UserType from '@/models/User'

type Props = {
  setUser: Dispatch<SetStateAction<UserType>>
  user: UserType
  setIsBioOpen: Dispatch<SetStateAction<boolean>>
  setIsNewProjectOpen: Dispatch<SetStateAction<boolean>>
}

const Header: FC<Props> = ({
  setUser,
  user,
  setIsBioOpen,
  setIsNewProjectOpen
}) => {
  const logout = async () => {
    try {
      await account.deleteSession('current')
      setUser({} as UserType)
    } catch (error) {
      console.error('Erro ao deslogar usuário: ', error)
    }
  }

  const handleSliderBio = () => setIsBioOpen(prevState => !prevState)

  return (
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
            <p className="mr-5 mt-2 hidden lg:block">Bem vinda, {user?.name}</p>
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
  )
}

export default Header
