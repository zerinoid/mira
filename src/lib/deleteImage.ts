import { AppwriteException } from 'appwrite'
import { storage } from './appwrite_client'

type errorProps = {
  success: boolean
  message: string
}

const deleteImage = async (fileId: string): Promise<errorProps> => {
  try {
    await storage.deleteFile(
      import.meta.env.VITE_IMAGE_BUCKET as string,
      fileId
    )
    return { success: true, message: 'Imagem deletada com sucesso' }
  } catch (error) {
    if (error instanceof AppwriteException) {
      if (error.code === 404) {
        return { success: true, message: 'Imagem já deletada' }
      } else {
        return { success: false, message: 'Erro ao deletar a imagem' }
      }
    }
    return {
      success: false,
      message: 'Erro genérico, favor contactar o administrador'
    }
  }
}

export default deleteImage
