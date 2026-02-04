'use client'

import * as m from 'motion/react-m'
import { useMemo } from 'react'
import { CloseOutlined } from '@nex-ui/icons'
import { DialogRoot } from './DialogRoot'
import { useStyles, useDefaultProps, useSlot, useSlotClasses } from '../utils'
import { Ripple } from '../ripple'
import { DialogClose } from './DialogClose'
import { dialogContentRecipe } from '../../theme/recipes'
import { ButtonBase } from '../buttonBase'
import { ModalContent } from '../modal'
import {
  DialogContentPropsProvider,
  useDialogPropsContext,
} from './DialogContext'
import type { ElementType } from 'react'
import type { Variants } from 'motion/react'
import type { DialogContentProps } from './types'
import type { DialogContentPropsContextValue } from './DialogContext'

const slots = ['root', 'paper', 'closeButton']

export const DialogContent = <RootComponent extends ElementType = 'div'>(
  inProps: DialogContentProps<RootComponent>,
) => {
  const props = useDefaultProps<DialogContentProps>({
    name: 'DialogContent',
    props: inProps,
  })

  const {
    disableAnimation,
    restoreFocus,
    closeOnEscape,
    closeOnInteractBackdrop,
    hideBackdrop,
  } = useDialogPropsContext()

  const {
    children,
    slotProps,
    closeIcon,
    classNames,
    motionProps,
    placement = 'top',
    scroll = 'outside',
    hideCloseButton = false,
    size = 'md',
    ...remainingProps
  } = props

  const ownerState: DialogContentProps = {
    ...props,
    placement,
    scroll,
    size,
    hideCloseButton,
  }

  const styles = useStyles({
    ownerState,
    name: 'DialogContent',
    recipe: dialogContentRecipe,
  })

  const {
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
  } = ownerState

  const slotAriaProps = useMemo(
    () => ({
      paper: {
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
      },
      closeButton: {
        'aria-label': 'Close dialog',
      },
    }),
    [ariaLabelledBy, ariaDescribedBy],
  )

  const slotClasses = useSlotClasses({
    name: 'DialogContent',
    slots,
    classNames,
  })

  const [DialogContentRoot, getDialogContentRootProps] = useSlot({
    elementType: 'div',
    style: styles.root,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    dataAttrs: {
      size,
      placement,
      scroll,
      hideCloseButton,
    },
  })

  const [DialogContentPaper, getDialogContentPaperProps] = useSlot({
    elementType: ModalContent,
    style: styles.paper,
    classNames: slotClasses.paper,
    externalSlotProps: slotProps?.paper,
    shouldForwardComponent: false,
    ariaProps: slotAriaProps.paper,
    additionalProps: {
      restoreFocus,
      closeOnEscape,
      closeOnInteractOutside: !hideBackdrop && closeOnInteractBackdrop,
    },
  })

  const [DialogContentCloseButton, getDialogContentCloseButtonProps] = useSlot({
    elementType: ButtonBase,
    externalSlotProps: slotProps?.closeButton,
    style: styles.closeButton,
    classNames: slotClasses.closeButton,
    shouldForwardComponent: false,
    ariaProps: slotAriaProps.closeButton,
  })

  const mergedMotionProps = useMemo(() => {
    const mProps =
      typeof motionProps === 'function' ? motionProps(placement) : motionProps

    const variants: Variants = {
      visible: {
        transform: 'scale(1)',
      },
      hidden: {
        transform: 'scale(1.04)',
      },
    }

    return {
      variants,
      ...mProps,
    }
  }, [motionProps, placement])

  const ctx = useMemo<DialogContentPropsContextValue>(
    () => ({
      scroll,
    }),
    [scroll],
  )

  const renderPaper = () => (
    <DialogContentPaper {...getDialogContentPaperProps()}>
      <DialogContentPropsProvider value={ctx}>
        {!hideCloseButton && (
          <DialogClose>
            <Ripple>
              <DialogContentCloseButton {...getDialogContentCloseButtonProps()}>
                {closeIcon ?? <CloseOutlined />}
              </DialogContentCloseButton>
            </Ripple>
          </DialogClose>
        )}
        {children}
      </DialogContentPropsProvider>
    </DialogContentPaper>
  )

  return (
    <DialogRoot>
      <DialogContentRoot {...getDialogContentRootProps()}>
        {disableAnimation ? (
          renderPaper()
        ) : (
          <m.div {...mergedMotionProps}>{renderPaper()}</m.div>
        )}
      </DialogContentRoot>
    </DialogRoot>
  )
}

DialogContent.displayName = 'DialogContent'
