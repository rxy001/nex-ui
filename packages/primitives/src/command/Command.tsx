'use client'

/**
 * https://w3c.github.io/aria/#command
 */

import { useCommand } from './useCommand'
import { createPrimitive } from '../utils'
import type { UseCommandProps, CommandState } from './useCommand'
import type { RenderProp } from '../utils/types'

export function Command({ render, ...other }: CommandProps) {
  const { props, state } = useCommand(other)

  return createPrimitive('div', props, {
    render,
    state,
  })
}

Command.displayName = 'Command'

export interface CommandProps extends UseCommandProps {
  render?: RenderProp<CommandState>
}
