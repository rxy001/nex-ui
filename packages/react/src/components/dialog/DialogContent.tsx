'use client'

import * as m from 'motion/react-m'
import { useMemo } from 'react'
import { CloseOutlined } from '@nex-ui/icons'
import { DialogRoot } from './DialogRoot'
import {
  useStyles,
  useDefaultProps,
  useSlot,
  Ripple,
  useSlotClasses,
} from '../utils'
import { DialogClose } from './DialogClose'
import { dialogContentRecipe } from '../../theme/recipes'
import { ButtonBase } from '../buttonBase'
import { ModalContent, ModalPanel } from '../modal'
import { DialogContentProvider, useDialog } from './DialogContext'
import type { ElementType } from 'react'
import type { DialogContentProps } from './types'

const slots = ['root', 'paper', 'closeButton']

const useSlotAriaProps = (ownerState: DialogContentProps) => {
  const {
    'aria-labelledby': defaultAriaLabelledBy,
    'aria-describedby': defaultAriaDescribedBy,
  } = ownerState

  const { paper = {}, closeButton = {} } = ownerState.slotProps ?? {}

  const { 'aria-label': closeButtonAriaLabel = 'Close dialog' } = closeButton

  const {
    'aria-labelledby': ariaLabelledBy = defaultAriaLabelledBy,
    'aria-describedby': ariaDescribedBy = defaultAriaDescribedBy,
  } = paper

  return useMemo(
    () => ({
      paper: {
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
      },
      closeButton: {
        'aria-label': closeButtonAriaLabel,
      },
    }),
    [ariaLabelledBy, ariaDescribedBy, closeButtonAriaLabel],
  )
}

export const DialogContent = <RootComponent extends ElementType = 'div'>(
  inProps: DialogContentProps<RootComponent>,
) => {
  const props = useDefaultProps<DialogContentProps>({
    name: 'DialogContent',
    props: inProps,
  })

  const { animateDisabled } = useDialog()

  const {
    children,
    slotProps,
    closeIcon,
    classNames,
    motionProps,
    placement = 'top',
    scroll = 'outside',
    fullScreen = false,
    hideCloseButton = false,
    size = 'md',
    ...remainingProps
  } = props

  const ownerState: DialogContentProps = {
    ...props,
    placement,
    scroll,
    size,
    fullScreen,
    hideCloseButton,
  }

  const styles = useStyles({
    ownerState,
    name: 'DialogContent',
    recipe: dialogContentRecipe,
  })

  const slotAriaProps = useSlotAriaProps(ownerState)

  const slotClasses = useSlotClasses({
    name: 'DialogContent',
    slots,
    classNames,
  })

  const [DialogContentRoot, getDialogContentRootProps] = useSlot({
    elementType: ModalPanel,
    style: styles.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    classNames: slotClasses.root,
    dataAttrs: {
      size,
      placement,
      scroll,
      fullScreen,
      hideCloseButton,
    },
  })

  const mergedMotionProps = useMemo(() => {
    const mProps =
      typeof motionProps === 'function' ? motionProps(placement) : motionProps

    return {
      variants: {
        visible: {
          transform: 'scale(1)',
        },
        hidden: {
          transform: 'scale(1.04)',
        },
      },
      ...mProps,
    }
  }, [motionProps, placement])

  const [DialogContentPaper, getDialogContentPaperProps] = useSlot({
    elementType: ModalContent,
    style: styles.paper,
    classNames: slotClasses.paper,
    externalSlotProps: slotProps?.paper,
    shouldForwardComponent: false,
    a11y: slotAriaProps.paper,
    additionalProps: !animateDisabled
      ? {
          as: m.section,
          ...mergedMotionProps,
        }
      : undefined,
  })

  const [DialogContentCloseButton, getDialogContentCloseButtonProps] = useSlot({
    elementType: ButtonBase,
    externalSlotProps: slotProps?.closeButton,
    style: styles.closeButton,
    classNames: slotClasses.closeButton,
    shouldForwardComponent: false,
    a11y: slotAriaProps.closeButton,
  })

  return (
    <DialogRoot>
      <DialogContentRoot {...getDialogContentRootProps()}>
        <DialogContentPaper {...getDialogContentPaperProps()}>
          <DialogContentProvider value={ownerState}>
            {!hideCloseButton && (
              <DialogClose>
                <Ripple>
                  <DialogContentCloseButton
                    {...getDialogContentCloseButtonProps()}
                  >
                    {closeIcon ?? <CloseOutlined />}
                  </DialogContentCloseButton>
                </Ripple>
              </DialogClose>
            )}
            {children}
          </DialogContentProvider>
        </DialogContentPaper>
      </DialogContentRoot>
    </DialogRoot>
  )
}

DialogContent.displayName = 'DialogContent'
