'use client'

import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { useModal } from './ModalContext'
import type { ElementType } from 'react'
import type { ModalPanelProps } from './types'

const recipe = defineRecipe({
  base: {
    position: 'fixed',
    inset: 0,
  },
})

const style = recipe()

export const ModalPanel = <RootComponent extends ElementType = 'div'>(
  props: ModalPanelProps<RootComponent>,
) => {
  const { modalContentRef, setOpen, open, closeOnInteractOutside } = useModal()

  const [ModalPanelRoot, getModalPanelRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: props,
    additionalProps: {
      onClick: (event) => {
        if (
          open &&
          closeOnInteractOutside &&
          modalContentRef.current &&
          !modalContentRef.current.contains(event.target as Node)
        ) {
          setOpen(false)
        }
      },
    },
  })

  return <ModalPanelRoot {...getModalPanelRootProps()} />
}

ModalPanel.displayName = 'ModalPanel'
