import { create } from 'zustand'
import type { Dispatch, SetStateAction } from 'react'

const useMenuStore = create<{
  hasMenu: boolean
}>(() => ({
  hasMenu: false,
}))

export const useMenu = () => useMenuStore((state) => state.hasMenu)

export const setMenu: Dispatch<SetStateAction<boolean>> = (fn) => {
  useMenuStore.setState((state) => {
    const hasMenu = typeof fn === 'function' ? fn(state.hasMenu) : fn
    // Lock background scroll when menu is opened
    document.body.classList.toggle('x:max-md:overflow-hidden', hasMenu)
    return { hasMenu }
  })
}
