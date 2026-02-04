'use client'

import * as m from 'motion/react-m'
import { useMemo } from 'react'
import { CloseOutlined } from '@nex-ui/icons'
import { DrawerRoot } from './DrawerRoot'
import { useStyles, useDefaultProps, useSlot, useSlotClasses } from '../utils'
import { Ripple } from '../ripple'
import { DrawerClose } from './DrawerClose'
import { drawerContentRecipe } from '../../theme/recipes'
import { ButtonBase } from '../buttonBase'
import { ModalContent } from '../modal'
import { useDrawerPropsContext } from './DrawerContext'
import type { ElementType } from 'react'
import type { Variants } from 'motion/react'
import type { DrawerContentProps } from './types'

const slots = ['root', 'paper', 'closeButton']

export const DrawerContent = <RootComponent extends ElementType = 'div'>(
  inProps: DrawerContentProps<RootComponent>,
) => {
  const props = useDefaultProps<DrawerContentProps>({
    name: 'DrawerContent',
    props: inProps,
  })

  const {
    disableAnimation,
    restoreFocus,
    closeOnEscape,
    closeOnInteractBackdrop,
    hideBackdrop,
  } = useDrawerPropsContext()

  const {
    classNames,
    children,
    slotProps,
    closeIcon,
    motionProps,
    placement = 'right',
    hideCloseButton = false,
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

  const styles = useStyles({
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
    elementType: 'div',
    style: styles.root,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    dataAttrs: {
      size,
      placement,
      hideCloseButton,
    },
  })

  const [DrawerContentPaper, getDrawerContentPaperProps] = useSlot({
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

  const [DrawerContentCloseButton, getDrawerContentCloseButtonProps] = useSlot({
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

  return (
    <DrawerRoot>
      <DrawerContentRoot {...getDrawerContentRootProps()}>
        {disableAnimation ? (
          renderPaper()
        ) : (
          <m.div {...mergedMotionProps}>{renderPaper()}</m.div>
        )}
      </DrawerContentRoot>
    </DrawerRoot>
  )
}

DrawerContent.displayName = 'DrawerContent'
