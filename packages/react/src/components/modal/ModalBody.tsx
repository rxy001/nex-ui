'use client'

import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { useModal } from './ModalContext'
import type { ElementType } from 'react'
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

export const ModalBody = <RootComponent extends ElementType = 'div'>(
  props: ModalBodyProps<RootComponent>,
) => {
  const { modalBodyId } = useModal()
  const bodyId = props.id ?? modalBodyId

  const [ModalBodyRoot, getModalBodyRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: props,
    a11y: {
      id: bodyId,
    },
  })

  return <ModalBodyRoot {...getModalBodyRootProps()} />
}

ModalBody.displayName = 'ModalBody'
