'use client'

import { nex } from '@nex-ui/styled'
import { useMemo } from 'react'
import { CloseOutlined } from '@nex-ui/icons'
import { AnimatePresence, LazyMotion } from 'motion/react'
import {
  useRecipeStyles,
  useDefaultProps,
  useSlot,
  useSlotClasses,
  motionFeatures,
  FadeInOutMotion,
  useKeepMountedState,
} from '../utils'
import { ModalBackdrop, ModalContent, ModalPortal } from '../modal'
import { Ripple } from '../ripple'
import { DialogClose } from './DialogClose'
import { dialogContentRecipe } from '../../themes/recipes'
import { ButtonBase } from '../buttonBase'
import { DialogPaperMotion } from './DialogPaperMotion'
import { DialogContentProvider, useDialogContext } from './DialogContext'
import type { ElementType } from 'react'
import type { DialogContentProps } from './types'
import type { DialogContentContextValue } from './DialogContext'

const slots = ['root', 'paper', 'backdrop', 'closeButton'] as const

export function DialogContent<RootComponent extends ElementType = 'div'>(
  inProps: DialogContentProps<RootComponent>,
) {
  const props = useDefaultProps<DialogContentProps>({
    name: 'DialogContent',
    props: inProps,
  })

  const {
    children,
    slotProps,
    closeIcon,
    classNames,
    motionProps,
    hideBackdrop,
    container,
    keepMounted,
    preventScroll,
    restoreFocus,
    autoFocus,
    closeOnEscape,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    disableAnimation = false,
    radius = 'md',
    placement = 'top',
    scroll = 'outside',
    hideCloseButton = false,
    closeOnInteractOutside = true,
    size = 'md',
    ...remainingProps
  } = props

  const ownerState: DialogContentProps = {
    ...props,
    radius,
    placement,
    scroll,
    size,
    hideCloseButton,
    disableAnimation,
  }

  const { open } = useDialogContext()

  const { resolvedDisplay, onAnimationStart, onAnimationComplete } =
    useKeepMountedState({
      open,
      keepMounted,
      disableAnimation,
      displayValue: 'flex',
    })

  const styles = useRecipeStyles({
    ownerState,
    name: 'DialogContent',
    recipe: dialogContentRecipe,
  })

  const slotAriaProps = useMemo(
    () => ({
      paper: {
        'aria-hidden': keepMounted && !open ? true : undefined,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
      },
      closeButton: {
        'aria-label': 'Close dialog',
      },
    }),
    [ariaLabelledBy, ariaDescribedBy, keepMounted, open],
  )

  const slotClasses = useSlotClasses({
    name: 'DialogContent',
    slots,
    classNames,
  })

  const [DialogContentRoot, getDialogContentRootProps] = useSlot({
    style: styles.root,
    component: nex.div,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    additionalProps: {
      style: {
        display: resolvedDisplay,
      },
    },
  })

  const [DialogContentPaper, getDialogContentPaperProps] = useSlot({
    component: ModalContent,
    style: styles.paper,
    classNames: slotClasses.paper,
    externalSlotProps: slotProps?.paper,
    ariaProps: slotAriaProps.paper,
    additionalProps: {
      preventScroll,
      restoreFocus,
      autoFocus,
      closeOnEscape,
      closeOnInteractOutside,
    },
    dataAttrs: {
      size,
      placement,
      scroll,
      hideCloseButton,
      radius,
    },
  })

  const [DialogContentCloseButton, getDialogContentCloseButtonProps] = useSlot({
    component: ButtonBase,
    externalSlotProps: slotProps?.closeButton,
    style: styles.closeButton,
    classNames: slotClasses.closeButton,
    ariaProps: slotAriaProps.closeButton,
  })

  const [DialogBackdrop, getDialogBackdropProps] = useSlot({
    component: ModalBackdrop,
    style: styles.backdrop,
    externalSlotProps: slotProps?.backdrop,
    classNames: slotClasses.backdrop,
  })

  const ctx = useMemo<DialogContentContextValue>(
    () => ({
      scroll,
    }),
    [scroll],
  )

  const renderPaper = () => (
    <DialogContentPaper {...getDialogContentPaperProps()}>
      <DialogContentProvider value={ctx}>
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
      </DialogContentProvider>
    </DialogContentPaper>
  )

  const renderContent = () => (
    <DialogContentRoot {...getDialogContentRootProps()}>
      {disableAnimation ? (
        <>
          {!hideBackdrop && <DialogBackdrop {...getDialogBackdropProps()} />}
          {renderPaper()}
        </>
      ) : (
        <FadeInOutMotion
          animate={open ? 'visible' : 'hidden'}
          onAnimationStart={onAnimationStart}
          onAnimationComplete={onAnimationComplete}
        >
          {!hideBackdrop && <DialogBackdrop {...getDialogBackdropProps()} />}
          <DialogPaperMotion motionProps={motionProps} placement={placement}>
            {renderPaper()}
          </DialogPaperMotion>
        </FadeInOutMotion>
      )}
    </DialogContentRoot>
  )

  const renderPortal = () =>
    open || keepMounted ? (
      <ModalPortal container={container} forceMount>
        {renderContent()}
      </ModalPortal>
    ) : null

  return disableAnimation ? (
    renderPortal()
  ) : (
    <LazyMotion features={motionFeatures}>
      <AnimatePresence initial={false}>{renderPortal()}</AnimatePresence>
    </LazyMotion>
  )
}

DialogContent.displayName = 'DialogContent'
