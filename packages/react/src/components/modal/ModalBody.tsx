'use client'

import { nex } from '@nex-ui/styled'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { useModalContext } from './ModalContext'
import type { ModalBodyProps } from './types'

const recipe = defineRecipe({
  base: {
    w: 'full',
    height: 'full',
  },
})

const style = recipe()

export function ModalBody(props: ModalBodyProps) {
  const { modalBodyId } = useModalContext()

  const [ModalBodyRoot, getModalBodyRootProps] = useSlot({
    style,
    component: nex.div,
    externalForwardedProps: props,
    ariaProps: {
      id: modalBodyId,
    },
  })

  return <ModalBodyRoot {...getModalBodyRootProps()} />
}

ModalBody.displayName = 'ModalBody'
