import { useMemo } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { modalHeaderRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import type { ElementType } from 'react'
import type { ModalHeaderOwnerState, ModalHeaderProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const modalRoot = `${prefix}-modal`

    const slots = {
      header: ['header'],
    }

    return composeClasses(slots, getUtilityClass(modalRoot))
  }, [prefix])
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

  const style = useStyles({
    ownerState,
    name: 'ModalHeader',
    recipe: modalHeaderRecipe,
  })

  const [ModalHeaderRoot, getModalHeaderRootProps] = useSlot({
    ownerState,
    style,
    elementType: 'h2',
    classNames: classes.header,
    externalForwardedProps: remainingProps,
  })

  return (
    <ModalHeaderRoot {...getModalHeaderRootProps()}>{children}</ModalHeaderRoot>
  )
}

ModalHeader.displayName = 'ModalHeader'
