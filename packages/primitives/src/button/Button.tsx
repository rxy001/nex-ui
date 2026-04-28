'use client'

import { useButton } from './useButton'
import { createPrimitive } from '../utils'
import type { UseButtonProps, ButtonState } from './useButton'
import type { RenderProp } from '../utils/types'

export function Button({ render, ...other }: ButtonProps) {
  const { props, state } = useButton(other)

  return createPrimitive('button', props, {
    render,
    state,
  })
}

Button.displayName = 'Button'

export interface ButtonProps extends UseButtonProps {
  render?: RenderProp<ButtonState>
}
