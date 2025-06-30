import { nex } from '@nex-ui/styled'
import { ElementType } from 'react'
import {
  useDefaultProps,
  useStyles,
  useSlotProps,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { modalFooterRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import type { ModalFooterOwnerState, ModalFooterProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  const modalRoot = `${prefix}-modal`

  const slots = {
    footer: ['footer'],
  }

  const composedClasses = composeClasses(slots, getUtilityClass(modalRoot))

  return composedClasses
}

export const ModalFooter = <RootComponent extends ElementType>(
  inProps: ModalFooterProps<RootComponent>,
) => {
  const props = useDefaultProps<ModalFooterProps>({
    name: 'ModalFooter',
    props: inProps,
  })

  const { children, size = 'md', ...remainingProps } = props

  const ownerState: ModalFooterOwnerState = {
    ...props,
    size,
  }

  const classes = useSlotClasses()

  const styles = useStyles({
    ownerState,
    name: 'ModalFooter',
    recipe: modalFooterRecipe,
  })

  const rootProps = useSlotProps({
    ownerState,
    sx: styles,
    classNames: classes.footer,
    externalForwardedProps: remainingProps,
  })

  return <nex.div {...rootProps}>{children}</nex.div>
}

ModalFooter.displayName = 'ModalFooter'
