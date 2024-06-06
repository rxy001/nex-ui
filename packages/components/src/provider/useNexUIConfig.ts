import { useContext } from 'react'
import { ConfigContext } from './NexUIProvider'

export function useNexUIConfig() {
  return useContext(ConfigContext)
}
