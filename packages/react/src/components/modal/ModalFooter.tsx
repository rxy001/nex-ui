'use client'

import { nex } from '@nex-ui/styled'
import { useSlotProps } from '../utils'
import { modalFooterRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { ModalFooterProps } from './types'

const style = modalFooterRecipe()

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
