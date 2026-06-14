import { getCachedData, setCachedData } from './cache'

async function fetchWithRetry(url, options = {}, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      if (i === retries) throw error
    }
  }
}

export function fetchWithCache(url, cacheKey) {
  const cached = getCachedData(cacheKey)
  if (cached) return Promise.resolve(cached)

  return fetchWithRetry(url).then((data) => {
    setCachedData(cacheKey, data)
    return data
  })
}

export function validateCharacterShape(data) {
  if (!data || typeof data !== 'object') return false
  return typeof data.id === 'number' && typeof data.name === 'string'
}

export function validateCharacterListShape(data) {
  if (!data || !Array.isArray(data.items)) return false
  return data.items.every((item) => validateCharacterShape(item))
}
