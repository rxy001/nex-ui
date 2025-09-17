'use client'

import { useEvent } from '@nex-ui/hooks'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { useModal } from './ModalContext'
import type { ElementType, MouseEvent } from 'react'
import type { ModalPanelProps } from './types'

const recipe = defineRecipe({
  base: {
    position: 'fixed',
    inset: 0,
  },
})

const style = recipe()

export const ModalPanel = <RootComponent extends ElementType = 'div'>(
  inProps: ModalPanelProps<RootComponent>,
) => {
  const { closeOnInteractOutside, setOpen } = useModal()

  const props = inProps as ModalPanelProps

  const handleClick = useEvent((e: MouseEvent<HTMLDivElement>) => {
    if (closeOnInteractOutside && e.target === e.currentTarget) {
      setOpen(false)
    }
  })

  const [ModalPanelRoot, getModalPanelRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: props,
    additionalProps: {
      onClick: handleClick,
    },
  })

  return <ModalPanelRoot {...getModalPanelRootProps()} />
}

ModalPanel.displayName = 'ModalPanel'
