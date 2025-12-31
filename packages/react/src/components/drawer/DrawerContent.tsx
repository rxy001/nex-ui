'use client'

import * as m from 'motion/react-m'
import { useMemo } from 'react'
import { CloseOutlined } from '@nex-ui/icons'
import { DrawerRoot } from './DrawerRoot'
import {
  useStyles,
  useDefaultProps,
  useSlot,
  Ripple,
  useSlotClasses,
} from '../utils'
import { DrawerClose } from './DrawerClose'
import { drawerContentRecipe } from '../../theme/recipes'
import { ButtonBase } from '../buttonBase'
import { ModalContent, ModalPanel } from '../modal'
import { useDrawerProps } from './DrawerContext'
import type { ElementType } from 'react'
import type { Variants } from 'motion/react'
import type { DrawerContentProps } from './types'

const slots = ['root', 'paper', 'closeButton']

const useSlotAriaProps = (ownerState: DrawerContentProps) => {
  const {
    'aria-labelledby': defaultAriaLabelledBy,
    'aria-describedby': defaultAriaDescribedBy,
  } = ownerState

  const { paper = {}, closeButton = {} } = ownerState.slotProps ?? {}

  const { 'aria-label': closeButtonAriaLabel = 'Close drawer' } = closeButton

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
  } = useDrawerProps()

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

  const slotAriaProps = useSlotAriaProps(ownerState)

  const slotClasses = useSlotClasses({
    name: 'DrawerContent',
    slots,
    classNames,
  })

  const [DrawerContentRoot, getDrawerContentRootProps] = useSlot({
    elementType: ModalPanel,
    style: styles.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
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
    a11y: slotAriaProps.paper,
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
    a11y: slotAriaProps.closeButton,
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
      // istanbul ignore next
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
