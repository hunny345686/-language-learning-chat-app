import { create } from 'zustand'

export const useThemeStore = create(set => ({
  theme: localStorage.getItem('theme') || 'coffee',
  setTheme: theme => set(localStorage.setItem('theme', theme), { theme }),
}))
