import Header from '@/components/Header'
import Projects from '@/components/Projects'
import UserType from '@/models/User'
import { useState } from 'react'
import SliderBio from '../components/SliderBio'

function App() {
  const [user, setUser] = useState<UserType>({} as UserType)
  const [isBioOpen, setIsBioOpen] = useState<boolean>(false)
  const [isNewProjectOpen, setIsNewProjectOpen] = useState<boolean>(false)

  return (
    <div className="container relative">
      <SliderBio
        userId={user?.$id}
        setIsOpen={setIsBioOpen}
        isOpen={isBioOpen}
      />
      <Header
        setUser={setUser}
        user={user}
        setIsBioOpen={setIsBioOpen}
        setIsNewProjectOpen={setIsNewProjectOpen}
      />
      <Projects
        user={user}
        setUser={setUser}
        isNewProjectOpen={isNewProjectOpen}
        setIsNewProjectOpen={setIsNewProjectOpen}
      />
    </div>
  )
}

export default App
