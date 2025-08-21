'use client'

import { nex } from '@nex-ui/styled'
import { defineRecipe } from '@nex-ui/system'
import { useSlotProps } from '../utils'
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
  inProps: ModalFooterProps<RootComponent>,
) => {
  const props = inProps as ModalFooterProps

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
  })

  return <nex.div {...rootProps} />
}

ModalFooter.displayName = 'ModalFooter'
