import IAppwrite from './Appwrite'

export default interface IProject extends IAppwrite {
  number: number
  category: string
  details?: string
  additional?: string
  title: string
  body: string
  date: string
  client: string
  image_path: string
}
