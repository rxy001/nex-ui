'use client'

import * as m from 'motion/react-m'
import { nex } from '@nex-ui/styled'
import { useMemo } from 'react'
import { CloseOutlined } from '@nex-ui/icons'
import { LazyMotion } from 'motion/react'
import {
  useRecipeStyles,
  useDefaultProps,
  useSlot,
  useSlotClasses,
  motionFeatures,
} from '../utils'
import { ModalBackdrop, ModalContent, ModalPortal, ModalMotion } from '../modal'
import { Ripple } from '../ripple'
import { DialogClose } from './DialogClose'
import { dialogContentRecipe } from '../../theme/recipes'
import { ButtonBase } from '../buttonBase'
import { DialogContentPropsProvider } from './DialogContext'
import type { ElementType } from 'react'
import type { Variants } from 'motion/react'
import type { DialogContentProps } from './types'
import type { DialogContentPropsContextValue } from './DialogContext'

const slots = ['root', 'paper', 'backdrop', 'closeButton'] as const

export const DialogContent = <RootComponent extends ElementType = 'div'>(
  inProps: DialogContentProps<RootComponent>,
) => {
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
    disableAnimation,
    preventScroll,
    restoreFocus,
    autoFocus,
    closeOnEscape,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    placement = 'top',
    scroll = 'outside',
    hideCloseButton = false,
    closeOnInteractOutside = true,
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

  const styles = useRecipeStyles({
    ownerState,
    name: 'DialogContent',
    recipe: dialogContentRecipe,
  })

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
    style: styles.root,
    component: nex.div,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
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

  const ctx = useMemo<DialogContentPropsContextValue>(
    () => ({
      scroll,
    }),
    [scroll],
  )

  const mergedMotionProps = useMemo(() => {
    const mProps =
      typeof motionProps === 'function' ? motionProps(placement) : motionProps

    const variants: Variants = {
      visible: {
        transform: 'scale(1)',
      },
      hidden: {
        transform: 'scale(1.03)',
      },
    }

    return {
      variants,
      ...mProps,
    }
  }, [motionProps, placement])

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

  const renderContent = () => (
    <>
      {!hideBackdrop && <DialogBackdrop {...getDialogBackdropProps()} />}
      <DialogContentRoot {...getDialogContentRootProps()}>
        <LazyMotion features={motionFeatures}>
          {disableAnimation ? (
            renderPaper()
          ) : (
            <m.div {...mergedMotionProps}>{renderPaper()}</m.div>
          )}
        </LazyMotion>
      </DialogContentRoot>
    </>
  )

  return (
    <ModalPortal
      disablePresence={disableAnimation}
      container={container}
      keepMounted={keepMounted}
    >
      {disableAnimation ? (
        renderContent()
      ) : (
        <ModalMotion
          style={{
            isolation: 'isolate',
          }}
        >
          {renderContent()}
        </ModalMotion>
      )}
    </ModalPortal>
  )
}

DialogContent.displayName = 'DialogContent'
