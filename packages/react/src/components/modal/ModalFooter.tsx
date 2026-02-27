'use client'

import { nex } from '@nex-ui/styled'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
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

export const ModalFooter = (props: ModalFooterProps) => {
  const [ModalFooterRoot, getModalFooterRootProps] = useSlot({
    style,
    component: nex.div,
    externalForwardedProps: props,
  })

  return <ModalFooterRoot {...getModalFooterRootProps()} />
}

ModalFooter.displayName = 'ModalFooter'
