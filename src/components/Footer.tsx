import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="font-sans border-t">
      <div className="text-sm text-bold container flex items-center justify-center h-12 px-[5px] md:justify-end">
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
