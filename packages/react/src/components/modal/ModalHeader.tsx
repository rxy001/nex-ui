'use client'

import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { useModal } from './ModalContext'
import type { ElementType } from 'react'
import type { ModalHeaderProps } from './types'

const recipe = defineRecipe({
  base: {
    w: 'full',
    m: 0,
    boxSizing: 'border-box',
  },
})

const style = recipe()

export const ModalHeader = <RootComponent extends ElementType = 'h2'>(
  props: ModalHeaderProps<RootComponent>,
) => {
  const { modalHeaderId } = useModal()
  const labelId = props.id ?? modalHeaderId
  const [ModalHeaderRoot, getModalHeaderRootProps] = useSlot({
    style,
    externalForwardedProps: props,
    elementType: 'h2',
    a11y: {
      id: labelId,
    },
  })

  return <ModalHeaderRoot {...getModalHeaderRootProps()} />
}

ModalHeader.displayName = 'ModalHeader'
