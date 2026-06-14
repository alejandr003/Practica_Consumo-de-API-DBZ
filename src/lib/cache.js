import { CACHE_DURATION } from './constants'

export function getCachedData(key) {
  try {
    const cached = localStorage.getItem(key)
    if (!cached) return null

    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key)
      return null
    }
    return data
  } catch {
    return null
  }
}

export function setCachedData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }))
  } catch {
    // Silently fail - cache is optional
  }
}
