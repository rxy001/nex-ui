import { create } from 'zustand'
import type { Dispatch } from 'react'

const useFocusedRouteStore = create<{
  focused: string
}>(() => ({
  focused: '',
}))

export const useFocusedRoute = () =>
  useFocusedRouteStore((state) => state.focused)

export const setFocusedRoute: Dispatch<string> = (focused) => {
  useFocusedRouteStore.setState({ focused })
}
