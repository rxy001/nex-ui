'use client'

import { nex } from '@nex-ui/styled'
import * as m from 'motion/react-m'
import { useMemo } from 'react'
import { CloseOutlined } from '@nex-ui/icons'
import {
  useRecipeStyles,
  useDefaultProps,
  useSlot,
  useSlotClasses,
} from '../utils'
import { Ripple } from '../ripple'
import { DrawerClose } from './DrawerClose'
import { drawerContentRecipe } from '../../theme/recipes'
import { ButtonBase } from '../buttonBase'
import { ModalContent, ModalPortal, ModalBackdrop, ModalMotion } from '../modal'
import type { ElementType } from 'react'
import type { Variants } from 'motion/react'
import type { DrawerContentProps } from './types'

const slots = ['root', 'paper', 'closeButton', 'backdrop'] as const

export const DrawerContent = <RootComponent extends ElementType = 'div'>(
  inProps: DrawerContentProps<RootComponent>,
) => {
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
    disableAnimation,
    restoreFocus,
    closeOnEscape,
    hideBackdrop,
    autoFocus,
    container,
    keepMounted,
    preventScroll,
    placement = 'right',
    hideCloseButton = false,
    closeOnInteractOutside = true,
    size = 'md',
    ...remainingProps
  } = props

  const ownerState: DrawerContentProps = {
    ...props,
    placement,
    size,
    closeIcon,
    hideCloseButton,
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
      },
      closeButton: {
        'aria-label': 'Close drawer',
      },
    }),
    [ariaLabelledBy, ariaDescribedBy],
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

  const mergedMotionProps = useMemo(() => {
    const mProps =
      typeof motionProps === 'function' ? motionProps(placement) : motionProps

    let variants: Variants
    switch (placement) {
      case 'left':
        variants = {
          visible: {
            transform: 'translateX(0)',
          },
          hidden: {
            transform: 'translateX(-100%)',
          },
        }
        break
      case 'right':
        variants = {
          visible: {
            transform: 'translateX(0)',
          },
          hidden: {
            transform: 'translateX(100%)',
          },
        }
        break
      case 'top':
        variants = {
          visible: {
            transform: 'translateY(0)',
          },
          hidden: {
            transform: 'translateY(-100%)',
          },
        }
        break
      case 'bottom':
        variants = {
          visible: {
            transform: 'translateY(0)',
          },
          hidden: {
            transform: 'translateY(100%)',
          },
        }
        break
      default:
        variants = {}
    }

    return {
      variants,
      ...mProps,
    }
  }, [motionProps, placement])

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
      {!hideBackdrop && <DrawerBackdrop {...getDrawerBackdropProps()} />}
      <DrawerContentRoot {...getDrawerContentRootProps()}>
        {disableAnimation ? (
          renderPaper()
        ) : (
          <m.div {...mergedMotionProps}>{renderPaper()}</m.div>
        )}
      </DrawerContentRoot>
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

DrawerContent.displayName = 'DrawerContent'
