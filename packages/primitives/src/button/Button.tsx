'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { useMergeRefs } from '@nex-ui/hooks'
import { isButton } from '@nex-ui/utils'
import { useCommand } from '../command'
import { createHook, createPrimitive, useTagName } from '../utils'
import type { CommandState } from '../command'
import type { HookProps, HTMLElements, RenderProp } from '../utils/types'

export const useButton = createHook<'button', ButtonOwnProps, ButtonState>(
  function useButton(props: UseButtonProps) {
    const ref = useRef<HTMLButtonElement>(null)
    const tagName = useTagName(ref)
    const mergedRefs = useMergeRefs(props.ref, ref)
    const [isNativeButton, setIsNativeButton] = useState(true)

    useLayoutEffect(() => {
      if (!ref.current) return

      setIsNativeButton(isButton(ref.current))
    }, [tagName])

    const command = useCommand<'button'>({
      ...props,
      ref: mergedRefs,
      clickOnEnter: true,
      clickOnSpace: true,
    })

    props = {
      ...command.props,
      role: !isNativeButton && tagName !== 'a' ? 'button' : undefined,
      type: isNativeButton ? command.props.type || 'button' : undefined,
      disabled: isNativeButton ? command.props.disabled : undefined,
    }

    return {
      props,
      state: command.state,
    }
  },
)

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

interface ButtonOwnProps {}

export interface ButtonState extends CommandState {}

export type UseButtonProps<Element extends HTMLElements = 'button'> = HookProps<
  Element,
  ButtonOwnProps
>
