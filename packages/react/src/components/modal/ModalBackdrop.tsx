'use client'

import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import type { ElementType } from 'react'
import type { ModalBackdropProps } from './types'

const recipe = defineRecipe({
  base: {
    position: 'fixed',
    inset: 0,
    bg: 'black/50',
  },
})

const style = recipe()

export const ModalBackdrop = <RootComponent extends ElementType = 'div'>(
  props: ModalBackdropProps<RootComponent>,
) => {
  const [ModalBackdropRoot, getModalBackdropRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: props,
    a11y: {
      'aria-hidden': true,
    },
  })

  return <ModalBackdropRoot {...getModalBackdropRootProps()} />
}

ModalBackdrop.displayName = 'ModalBackdrop'
