export const API_BASE_URL = import.meta.env.VITE_DRAGON_BALL_API_BASE_URL || 'https://dragonball-api.com/api'
export const REMOVE_BG_API_KEY = import.meta.env.VITE_REMOVE_BG_API_KEY || ''

export const API_ENDPOINTS = {
  characters: (page = 1, limit = 62) => `${API_BASE_URL}/characters?page=${page}&limit=${limit}`,
  character: (id) => `${API_BASE_URL}/characters/${id}`,
}

export const CACHE_KEYS = {
  characters: 'dbz_characters',
  character: (id) => `dbz_character_${id}`,
}

export const CACHE_DURATION = 1000 * 60 * 30

export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x280?text=No+Image'
