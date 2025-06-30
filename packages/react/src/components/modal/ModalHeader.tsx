import { ElementType } from 'react'
import { nex } from '@nex-ui/styled'
import {
  useDefaultProps,
  useSlotProps,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { modalHeaderRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import type { ModalHeaderOwnerState, ModalHeaderProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  const modalRoot = `${prefix}-modal`

  const slots = {
    header: ['header'],
  }

  const composedClasses = composeClasses(slots, getUtilityClass(modalRoot))

  return composedClasses
}

export const ModalHeader = <RootComponent extends ElementType = 'h2'>(
  inProps: ModalHeaderProps<RootComponent>,
) => {
  const props = useDefaultProps<ModalHeaderProps>({
    name: 'ModalHeader',
    props: inProps,
  })

  const { children, size = 'md', ...remainingProps } = props

  const ownerState: ModalHeaderOwnerState = {
    ...props,
    size,
  }

  const classes = useSlotClasses()

  const styles = useStyles({
    ownerState,
    name: 'ModalHeader',
    recipe: modalHeaderRecipe,
  })

  const rootProps = useSlotProps({
    ownerState,
    sx: styles,
    classNames: classes.header,
    externalForwardedProps: remainingProps,
  })

  return <nex.h2 {...rootProps}>{children}</nex.h2>
}

ModalHeader.displayName = 'ModalHeader'
