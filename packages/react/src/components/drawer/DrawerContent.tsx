'use client'

import * as m from 'motion/react-m'
import { useMemo } from 'react'
import { CloseOutlined } from '@nex-ui/icons'
import { useNexUI } from '../provider'
import { DrawerRoot } from './DrawerRoot'
import {
  useStyles,
  composeClasses,
  getUtilityClass,
  useDefaultProps,
  useSlot,
  Ripple,
} from '../utils'
import { DrawerClose } from './DrawerClose'
import { drawerContentRecipe } from '../../theme/recipes'
import { ButtonBase } from '../buttonBase'
import { ModalContent, ModalPanel } from '../modal'
import type { ElementType } from 'react'
import type { Variants } from 'motion/react'
import type { DrawerContentOwnerState, DrawerContentProps } from './types'

const useSlotClasses = (ownerState: DrawerContentOwnerState) => {
  const { prefix } = useNexUI()

  const { classes, size, placement } = ownerState

  return useMemo(() => {
    const prefixClassName = `${prefix}-drawer-content`

    const slots = {
      root: ['root', `size-${size}`, `placement-${placement}`],
      paper: ['paper'],
      closeButton: ['close-button'],
    }

    return composeClasses(slots, getUtilityClass(prefixClassName), classes)
  }, [prefix, size, placement, classes])
}

const useSlotAriaProps = (ownerState: DrawerContentOwnerState) => {
  const {
    'aria-labelledby': defaultAriaLabelledBy,
    'aria-describedby': defaultAriaDescribedBy,
  } = ownerState

  const { paper = {}, closeButton = {} } = ownerState.slotProps ?? {}

  const { 'aria-label': closeButtonAriaLabel = 'Close drawer' } = closeButton

  const {
    role = 'dialog',
    'aria-modal': ariaModal = true,
    'aria-labelledby': ariaLabelledBy = defaultAriaLabelledBy,
    'aria-describedby': ariaDescribedBy = defaultAriaDescribedBy,
  } = paper

  return useMemo(
    () => ({
      paper: {
        role,
        'aria-modal': ariaModal,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
      },
      closeButton: {
        'aria-label': closeButtonAriaLabel,
      },
    }),
    [role, ariaModal, ariaLabelledBy, ariaDescribedBy, closeButtonAriaLabel],
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
    children,
    slotProps,
    closeIcon,
    motionProps: motionPropsProp,
    placement = 'right',
    hideCloseButton = false,
    size = 'md',
    ...remainingProps
  } = props

  const ownerState: DrawerContentOwnerState = {
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

  const classes = useSlotClasses(ownerState)

  const motionProps = useMemo(() => {
    const mProps =
      typeof motionPropsProp === 'function'
        ? motionPropsProp(placement)
        : motionPropsProp

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
  }, [motionPropsProp, placement])

  const [DrawerContentRoot, getDrawerContentRootProps] = useSlot({
    ownerState,
    elementType: ModalPanel,
    style: styles.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    classNames: classes.root,
  })

  const [DrawerContentPaper, getDrawerContentPaperProps] = useSlot({
    ownerState,
    elementType: ModalContent,
    style: styles.paper,
    classNames: classes.paper,
    externalSlotProps: slotProps?.paper,
    shouldForwardComponent: false,
    a11y: slotAriaProps.paper,
    additionalProps: {
      as: m.div,
      ...motionProps,
    },
  })

  const [DrawerContentCloseButton, getDrawerContentCloseButtonProps] = useSlot({
    ownerState,
    elementType: ButtonBase,
    externalSlotProps: slotProps?.closeButton,
    style: styles.closeButton,
    classNames: classes.closeButton,
    shouldForwardComponent: false,
    a11y: slotAriaProps.closeButton,
  })

  return (
    <DrawerRoot>
      <DrawerContentRoot {...getDrawerContentRootProps()}>
        <DrawerContentPaper {...getDrawerContentPaperProps()}>
          {!hideCloseButton && (
            <DrawerClose>
              <Ripple>
                <DrawerContentCloseButton
                  {...getDrawerContentCloseButtonProps()}
                >
                  {closeIcon ?? <CloseOutlined />}
                </DrawerContentCloseButton>
              </Ripple>
            </DrawerClose>
          )}
          {children}
        </DrawerContentPaper>
      </DrawerContentRoot>
    </DrawerRoot>
  )
}

DrawerContent.displayName = 'DrawerContent'
