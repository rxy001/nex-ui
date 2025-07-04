import { ElementType, useMemo } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { modalFooterRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import type { ModalFooterOwnerState, ModalFooterProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const modalRoot = `${prefix}-modal`

    const slots = {
      footer: ['footer'],
    }

    return composeClasses(slots, getUtilityClass(modalRoot))
  }, [prefix])
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

  const style = useStyles({
    ownerState,
    name: 'ModalFooter',
    recipe: modalFooterRecipe,
  })

  const [ModalFooterRoot, getModalFooterRootProps] = useSlot({
    ownerState,
    style,
    elementType: 'div',
    classNames: classes.footer,
    externalForwardedProps: remainingProps,
  })

  return (
    <ModalFooterRoot {...getModalFooterRootProps()}>{children}</ModalFooterRoot>
  )
}

ModalFooter.displayName = 'ModalFooter'
