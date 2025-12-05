'use client'

import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
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
  const [ModalPanelRoot, getModalPanelRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: props,
  })

  return <ModalPanelRoot {...getModalPanelRootProps()} />
}

ModalPanel.displayName = 'ModalPanel'
