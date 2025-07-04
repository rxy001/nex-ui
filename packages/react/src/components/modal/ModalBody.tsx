import { nex } from '@nex-ui/styled'
import { useSlotProps } from '../utils'
import { modalBodyRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { ModalBodyProps } from './types'

const style = modalBodyRecipe()

export const ModalBody = <RootComponent extends ElementType = 'div'>(
  inProps: ModalBodyProps<RootComponent>,
) => {
  const props = inProps as ModalBodyProps

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
  })

  return <nex.div {...rootProps} />
}

ModalBody.displayName = 'ModalBody'
