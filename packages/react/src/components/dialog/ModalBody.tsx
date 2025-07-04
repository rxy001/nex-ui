import { useMemo } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { modalBodyRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { useModalProps } from './ModalContext'
import type { ElementType } from 'react'
import type { ModalBodyOwnerState, ModalBodyProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const modalRoot = `${prefix}-modal`

    const slots = {
      body: ['body'],
    }

    return composeClasses(slots, getUtilityClass(modalRoot))
  }, [prefix])
}

export const ModalBody = <RootComponent extends ElementType = 'div'>(
  inProps: ModalBodyProps<RootComponent>,
) => {
  const { scroll } = useModalProps()

  const props = useDefaultProps<ModalBodyProps>({
    name: 'ModalBody',
    props: inProps,
  })

  const { children, size = 'md', ...remainingProps } = props

  const ownerState: ModalBodyOwnerState = {
    ...props,
    size,
  }

  const style = useStyles({
    ownerState: {
      ...ownerState,
      scroll: scroll === 'inside',
    },
    name: 'ModalBody',
    recipe: modalBodyRecipe,
  })

  const classes = useSlotClasses()

  const [ModalBodyRoot, getModalBodyRootProps] = useSlot({
    ownerState,
    style,
    elementType: 'div',
    classNames: classes.body,
    externalForwardedProps: remainingProps,
  })

  return <ModalBodyRoot {...getModalBodyRootProps()}>{children}</ModalBodyRoot>
}

ModalBody.displayName = 'ModalBody'
