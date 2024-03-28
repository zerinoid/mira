import Header from '@/components/Header'
import Projects from '@/components/Projects'
import UserType from '@/models/User'
import { useState } from 'react'
import SliderBio from '../components/SliderBio'
import Footer from '@/components/Footer'

function App() {
  const [user, setUser] = useState<UserType>({} as UserType)
  const [isBioOpen, setIsBioOpen] = useState<boolean>(false)
  const [isNewProjectOpen, setIsNewProjectOpen] = useState<boolean>(false)

  return (
    <>
      <Header
        setUser={setUser}
        user={user}
        setIsBioOpen={setIsBioOpen}
        setIsNewProjectOpen={setIsNewProjectOpen}
      />
      <div className="relative container envelope">
        <SliderBio
          userId={user?.$id}
          setIsOpen={setIsBioOpen}
          isOpen={isBioOpen}
        />
        <Projects
          user={user}
          setUser={setUser}
          isNewProjectOpen={isNewProjectOpen}
          setIsNewProjectOpen={setIsNewProjectOpen}
        />
      </div>
      <Footer />
    </>
  )
}

export default App
