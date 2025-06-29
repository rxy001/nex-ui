import { nex } from '@nex-ui/styled'
import {
  useDefaultProps,
  useSlotProps,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { modalBodyRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { useModalProps } from './ModalContext'
import type { ElementType } from 'react'
import type { ModalBodyOwnerState, ModalBodyProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  const modalRoot = `${prefix}-modal`

  const slots = {
    body: ['body'],
  }

  const composedClasses = composeClasses(slots, getUtilityClass(modalRoot))

  return composedClasses
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

  const styles = useStyles({
    ownerState: {
      ...ownerState,
      scroll: scroll === 'inside',
    },
    name: 'ModalBody',
    recipe: modalBodyRecipe,
  })

  const classes = useSlotClasses()

  const rootProps = useSlotProps({
    ownerState,
    sx: styles,
    classNames: classes.body,
    externalForwardedProps: remainingProps,
  })

  return <nex.div {...rootProps}>{children}</nex.div>
}

ModalBody.displayName = 'ModalBody'
