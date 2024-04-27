import { storage } from './appwrite_client'

const deleteImage = async (fileId: string): Promise<boolean> => {
  try {
    await storage.deleteFile(
      import.meta.env.VITE_IMAGE_BUCKET as string,
      fileId
    )
    return true
  } catch (error) {
    console.error('Erro ao deletar a imagem:', error)
    return false
  }
}

export default deleteImage
