'use client'

import { nex } from '@nex-ui/styled'
import { useSlotProps } from '../utils'
import { modalContentRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { ModalContentProps } from './types'

const style = modalContentRecipe()

export const ModalContent = <RootComponent extends ElementType = 'section'>(
  inProps: ModalContentProps<RootComponent>,
) => {
  const props = inProps as ModalContentProps

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
  })

  return <nex.section {...rootProps} />
}

ModalContent.displayName = 'ModalContent'
