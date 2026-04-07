import { beforeEach } from 'vitest'

beforeEach(() => {
  window.localStorage.clear()
  document.documentElement.dataset.theme = 'light'
  document.documentElement.classList.remove('dark')
})
