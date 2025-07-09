'use client'

import { nex } from '@nex-ui/styled'
import { modalBackdropRecipe } from '../../theme/recipes'
import { useSlotProps } from '../utils'
import type { ElementType } from 'react'
import type { ModalBackdropProps } from './types'

const style = modalBackdropRecipe()

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
