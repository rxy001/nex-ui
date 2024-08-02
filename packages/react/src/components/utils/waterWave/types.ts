import type { ReactElement } from 'react'

export type WaveProps = {
  children: ReactElement
  disabled?: boolean
}

export type WaveMotionProps = {
  target: HTMLElement
  onMotionFinished: () => void
}
