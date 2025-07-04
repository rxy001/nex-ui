'use client'

import { nex } from '@nex-ui/styled'
import { useSlotProps } from '../utils'
import { modalFooterRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { ModalHeaderProps } from './types'

const style = modalFooterRecipe()

export const ModalHeader = <RootComponent extends ElementType = 'h2'>(
  inProps: ModalHeaderProps<RootComponent>,
) => {
  const props = inProps as ModalHeaderProps

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
  })

  return <nex.div {...rootProps} />
}

ModalHeader.displayName = 'ModalHeader'
