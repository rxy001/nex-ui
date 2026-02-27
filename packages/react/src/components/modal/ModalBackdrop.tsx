'use client'

import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import type { ModalBackdropProps } from './types'

const recipe = defineRecipe({
  base: {
    position: 'fixed',
    inset: 0,
    bg: 'black/50',
  },
})

const style = recipe()

export const ModalBackdrop = (props: ModalBackdropProps) => {
  const [ModalBackdropRoot, getModalBackdropRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: props,
    ariaProps: {
      'aria-hidden': true,
    },
  })

  return <ModalBackdropRoot {...getModalBackdropRootProps()} />
}

ModalBackdrop.displayName = 'ModalBackdrop'
