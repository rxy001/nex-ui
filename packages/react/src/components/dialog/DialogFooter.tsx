'use client'

import { useMemo } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { dialogFooterRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { ModalFooter } from '../modal'
import type { ElementType } from 'react'
import type { DialogFooterOwnerState, DialogFooterProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const modalRoot = `${prefix}-dialog`

    const slots = {
      footer: ['footer'],
    }

    return composeClasses(slots, getUtilityClass(modalRoot))
  }, [prefix])
}

export const DialogFooter = <RootComponent extends ElementType>(
  inProps: DialogFooterProps<RootComponent>,
) => {
  const props = useDefaultProps<DialogFooterProps>({
    name: 'DialogFooter',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const ownerState: DialogFooterOwnerState = {
    ...props,
  }

  const classes = useSlotClasses()

  const style = useStyles({
    ownerState,
    name: 'DialogFooter',
    recipe: dialogFooterRecipe,
  })

  const [DialogFooterRoot, getDialogFooterRootProps] = useSlot({
    ownerState,
    style,
    elementType: ModalFooter,
    classNames: classes.footer,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
  })

  return (
    <DialogFooterRoot {...getDialogFooterRootProps()}>
      {children}
    </DialogFooterRoot>
  )
}

DialogFooter.displayName = 'DialogFooter'
