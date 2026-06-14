import axios from 'axios'
import { REMOVE_BG_API_KEY } from './constants'

const objectUrls = new Set()

export function revokeObjectUrl(url) {
  if (objectUrls.has(url)) {
    URL.revokeObjectURL(url)
    objectUrls.delete(url)
  }
}

export function revokeAllObjectUrls() {
  objectUrls.forEach((url) => URL.revokeObjectURL(url))
  objectUrls.clear()
}

const removeBackground = async (imageUrl) => {
  if (!REMOVE_BG_API_KEY) return imageUrl

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
    return url
  } catch {
    return imageUrl
  }
}

export default removeBackground
