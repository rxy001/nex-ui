'use client'

import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import type { ElementType } from 'react'
import type { ModalFooterProps } from './types'

const recipe = defineRecipe({
  base: {
    w: 'full',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '5',
  },
})

const style = recipe()

export const ModalFooter = <RootComponent extends ElementType = 'div'>(
  props: ModalFooterProps<RootComponent>,
) => {
  const [ModalFooterRoot, getModalFooterRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: props,
  })

  return <ModalFooterRoot {...getModalFooterRootProps()} />
}

ModalFooter.displayName = 'ModalFooter'
