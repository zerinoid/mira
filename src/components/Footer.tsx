import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="bg-foreground text-background font-sans">
      <div className="text-sm container flex items-center justify-center h-16">
        <div>
          <a
            href="mailto:leo.zerino@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            zerino desenvolvimento
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
