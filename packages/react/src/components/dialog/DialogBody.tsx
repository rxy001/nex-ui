'use client'

import { useMemo } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { dialogBodyRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { useDialogContent } from './DialogContext'
import { ModalBody } from '../modal'
import type { ElementType } from 'react'
import type { DialogBodyOwnerState, DialogBodyProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const prefixClassName = `${prefix}-dialog-body`

    const slots = {
      root: ['root'],
    }

    return composeClasses(slots, getUtilityClass(prefixClassName))
  }, [prefix])
}

export const DialogBody = <RootComponent extends ElementType = 'div'>(
  inProps: DialogBodyProps<RootComponent>,
) => {
  const { scroll } = useDialogContent()

  const props = useDefaultProps<DialogBodyProps>({
    name: 'DialogBody',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const ownerState: DialogBodyOwnerState = props

  const style = useStyles({
    ownerState: {
      ...ownerState,
      scroll,
    },
    name: 'DialogBody',
    recipe: dialogBodyRecipe,
  })

  const classes = useSlotClasses()

  const [DialogBodyRoot, getDialogBodyRootProps] = useSlot({
    ownerState,
    style,
    elementType: ModalBody,
    classNames: classes.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
  })

  return (
    <DialogBodyRoot {...getDialogBodyRootProps()}>{children}</DialogBodyRoot>
  )
}

DialogBody.displayName = 'DialogBody'
