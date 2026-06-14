import axios from 'axios'
import { REMOVE_BG_API_KEY } from './constants'

const objectUrls = new Set()
const processedImageCache = new Map() // Caché en memoria para blobs

export function revokeObjectUrl(url) {
  if (objectUrls.has(url)) {
    URL.revokeObjectURL(url)
    objectUrls.delete(url)
  }
}

export function revokeAllObjectUrls() {
  objectUrls.forEach((url) => URL.revokeObjectURL(url))
  objectUrls.clear()
  processedImageCache.clear()
}

const removeBackground = async (imageUrl) => {
  if (!REMOVE_BG_API_KEY) return imageUrl

  // Verificar caché en memoria primero
  if (processedImageCache.has(imageUrl)) {
    const cachedUrl = processedImageCache.get(imageUrl)
    return cachedUrl
  }

  const formData = new FormData()
  formData.append('image_url', imageUrl)
  formData.append('size', 'auto')

  try {
    const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      headers: { 'X-Api-Key': REMOVE_BG_API_KEY },
      responseType: 'blob',
    })

    const blob = response.data
    const url = URL.createObjectURL(blob)
    objectUrls.add(url)
    
    // Guardar en caché para futuras requests
    processedImageCache.set(imageUrl, url)
    
    return url
  } catch {
    return imageUrl
  }
}

export function clearImageCache() {
  processedImageCache.clear()
}

export function getCachedImageUrl(imageUrl) {
  return processedImageCache.get(imageUrl)
}

export default removeBackground
