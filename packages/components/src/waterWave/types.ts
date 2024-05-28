import type { ReactElement } from 'react'
import type { Root } from 'react-dom/client'

export type WaveProps = {
  children: ReactElement
}

export type WaveMotionProps = {
  target: HTMLElement
  root: Root
}
