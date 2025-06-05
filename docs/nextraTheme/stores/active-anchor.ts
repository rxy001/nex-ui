import { create } from 'zustand'
import type { Dispatch } from 'react'

const useActiveAnchorStore = create<{
  activeSlug: string
}>(() => ({
  activeSlug: '',
}))

export const useActiveAnchor = () =>
  useActiveAnchorStore((state) => state.activeSlug)

export const setActiveSlug: Dispatch<string> = (activeSlug) => {
  useActiveAnchorStore.setState({ activeSlug })
}
