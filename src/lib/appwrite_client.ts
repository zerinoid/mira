import { Account, Client, Databases, Storage } from 'appwrite'

const client = new Client()

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT as string)
  .setProject(import.meta.env.VITE_PROJECT_ID as string)

export const databases = new Databases(client)
export const account = new Account(client)
export const storage = new Storage(client)

export default client
