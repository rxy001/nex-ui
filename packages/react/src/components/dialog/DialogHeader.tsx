'use client'

import { useMemo } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { dialogHeaderRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { ModalHeader } from '../modal'
import type { ElementType } from 'react'
import type { DialogHeaderOwnerState, DialogHeaderProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const prefixClassName = `${prefix}-dialog-header`

    const slots = {
      root: ['root'],
    }

    return composeClasses(slots, getUtilityClass(prefixClassName))
  }, [prefix])
}

export const DialogHeader = <RootComponent extends ElementType = 'h2'>(
  inProps: DialogHeaderProps<RootComponent>,
) => {
  const props = useDefaultProps<DialogHeaderProps>({
    name: 'DialogHeader',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const ownerState: DialogHeaderOwnerState = {
    ...props,
  }

  const classes = useSlotClasses()

  const style = useStyles({
    ownerState,
    name: 'DialogHeader',
    recipe: dialogHeaderRecipe,
  })

  const [DialogHeaderRoot, getDialogHeaderRootProps] = useSlot({
    ownerState,
    style,
    elementType: ModalHeader,
    classNames: classes.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
  })

  return (
    <DialogHeaderRoot {...getDialogHeaderRootProps()}>
      {children}
    </DialogHeaderRoot>
  )
}

DialogHeader.displayName = 'DialogHeader'
