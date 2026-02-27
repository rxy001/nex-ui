'use client'

import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { useModalContext } from './ModalContext'
import type { ModalBodyProps } from './types'

const recipe = defineRecipe({
  base: {
    w: 'full',
    boxSizing: 'border-box',
    height: '100%',
    wordBreak: 'break-word',
  },
})

const style = recipe()

export const ModalBody = (props: ModalBodyProps) => {
  const { modalBodyId } = useModalContext()

  const [ModalBodyRoot, getModalBodyRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: props,
    ariaProps: {
      id: modalBodyId,
    },
  })

  return <ModalBodyRoot {...getModalBodyRootProps()} />
}

ModalBody.displayName = 'ModalBody'
