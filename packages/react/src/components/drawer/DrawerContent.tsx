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
import { Ripple } from '../ripple'
import { DrawerClose } from './DrawerClose'
import { drawerContentRecipe } from '../../theme/recipes'
import { ButtonBase } from '../buttonBase'
import { ModalContent, ModalPortal, ModalBackdrop } from '../modal'
import { useDrawerContext } from './DrawerContext'
import { DrawerPaperMotion } from './DrawerPaperMotion'
import type { ElementType } from 'react'
import type { DrawerContentProps } from './types'

const slots = ['root', 'paper', 'closeButton', 'backdrop'] as const

export function DrawerContent<RootComponent extends ElementType = 'div'>(
  inProps: DrawerContentProps<RootComponent>,
) {
  const props = useDefaultProps<DrawerContentProps>({
    name: 'DrawerContent',
    props: inProps,
  })

  const {
    classNames,
    children,
    slotProps,
    closeIcon,
    motionProps,
    restoreFocus,
    closeOnEscape,
    hideBackdrop,
    autoFocus,
    container,
    keepMounted,
    preventScroll,
    placement = 'right',
    radius = 'md',
    hideCloseButton = false,
    closeOnInteractOutside = true,
    disableAnimation = false,
    size = 'md',
    ...remainingProps
  } = props

  const { open } = useDrawerContext()

  const { resolvedDisplay, onAnimationStart, onAnimationComplete } =
    useKeepMountedState({
      open,
      keepMounted,
      disableAnimation,
      displayValue: 'flex',
    })

  const ownerState: DrawerContentProps = {
    ...props,
    placement,
    radius,
    size,
    closeIcon,
    hideCloseButton,
    disableAnimation,
  }

  const styles = useRecipeStyles({
    ownerState,
    name: 'DrawerContent',
    recipe: drawerContentRecipe,
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
        'aria-hidden': keepMounted && !open ? true : undefined,
      },
      closeButton: {
        'aria-label': 'Close drawer',
      },
    }),
    [ariaLabelledBy, ariaDescribedBy, keepMounted, open],
  )

  const slotClasses = useSlotClasses({
    name: 'DrawerContent',
    slots,
    classNames,
  })

  const [DrawerContentRoot, getDrawerContentRootProps] = useSlot({
    component: nex.div,
    style: styles.root,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    additionalProps: {
      style: {
        display: resolvedDisplay,
      },
    },
  })

  const [DrawerContentPaper, getDrawerContentPaperProps] = useSlot({
    component: ModalContent,
    style: styles.paper,
    classNames: slotClasses.paper,
    externalSlotProps: slotProps?.paper,
    ariaProps: slotAriaProps.paper,
    additionalProps: {
      restoreFocus,
      closeOnEscape,
      autoFocus,
      preventScroll,
      closeOnInteractOutside,
    },
    dataAttrs: {
      size,
      radius,
      placement,
      hideCloseButton,
    },
  })

  const [DrawerContentCloseButton, getDrawerContentCloseButtonProps] = useSlot({
    component: ButtonBase,
    externalSlotProps: slotProps?.closeButton,
    style: styles.closeButton,
    classNames: slotClasses.closeButton,
    ariaProps: slotAriaProps.closeButton,
  })

  const [DrawerBackdrop, getDrawerBackdropProps] = useSlot({
    component: ModalBackdrop,
    style: styles.backdrop,
    externalSlotProps: slotProps?.backdrop,
    classNames: slotClasses.backdrop,
  })

  const renderPaper = () => (
    <DrawerContentPaper {...getDrawerContentPaperProps()}>
      {!hideCloseButton && (
        <DrawerClose>
          <Ripple>
            <DrawerContentCloseButton {...getDrawerContentCloseButtonProps()}>
              {closeIcon ?? <CloseOutlined />}
            </DrawerContentCloseButton>
          </Ripple>
        </DrawerClose>
      )}
      {children}
    </DrawerContentPaper>
  )

  const renderContent = () => (
    <>
      <DrawerContentRoot {...getDrawerContentRootProps()}>
        {disableAnimation ? (
          <>
            {!hideBackdrop && <DrawerBackdrop {...getDrawerBackdropProps()} />}
            {renderPaper()}
          </>
        ) : (
          <FadeInOutMotion
            animate={open ? 'visible' : 'hidden'}
            onAnimationStart={onAnimationStart}
            onAnimationComplete={onAnimationComplete}
          >
            {!hideBackdrop && <DrawerBackdrop {...getDrawerBackdropProps()} />}
            <DrawerPaperMotion motionProps={motionProps} placement={placement}>
              {renderPaper()}
            </DrawerPaperMotion>
          </FadeInOutMotion>
        )}
      </DrawerContentRoot>
    </>
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

DrawerContent.displayName = 'DrawerContent'
