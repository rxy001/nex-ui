'use client'

import { nex } from '@nex-ui/styled'
import { defineRecipe } from '@nex-ui/system'
import { useSlotProps } from '../utils'
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
  inProps: ModalBackdropProps<RootComponent>,
) => {
  const props = inProps as ModalBackdropProps

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
    a11y: {
      'aria-hidden': true,
    },
  })

  return <nex.div {...rootProps} />
}

ModalBackdrop.displayName = 'ModalBackdrop'
