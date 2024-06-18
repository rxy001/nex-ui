import type { ReactElement } from 'react'
import type { Root } from 'react-dom/client'

export type WaveProps = {
  children: ReactElement
  disabled?: boolean
}

export type WaveMotionProps = {
  target: HTMLElement
  root: Root
}
