'use client'

import { nex } from '@nex-ui/styled'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { useModalContext } from './ModalContext'
import type { ModalHeaderProps } from './types'

const recipe = defineRecipe({
  base: {
    w: 'full',
    m: 0,
    boxSizing: 'border-box',
  },
})

const style = recipe()

export const ModalHeader = (props: ModalHeaderProps) => {
  const { modalHeaderId } = useModalContext()
  const [ModalHeaderRoot, getModalHeaderRootProps] = useSlot({
    style,
    externalForwardedProps: props,
    component: nex.h2,
    ariaProps: {
      id: modalHeaderId,
    },
  })

  return <ModalHeaderRoot {...getModalHeaderRootProps()} />
}

ModalHeader.displayName = 'ModalHeader'
