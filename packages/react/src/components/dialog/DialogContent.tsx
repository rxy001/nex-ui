'use client'

import * as m from 'motion/react-m'
import { useMemo } from 'react'
import { CloseOutlined } from '@nex-ui/icons'
import { useNexUI } from '../provider'
import { DialogRoot } from './DialogRoot'
import {
  useStyles,
  composeClasses,
  getUtilityClass,
  useDefaultProps,
  useSlot,
  Ripple,
} from '../utils'
import { DialogClose } from './DialogClose'
import { dialogContentRecipe } from '../../theme/recipes'
import { ButtonBase } from '../buttonBase'
import { ModalContent, ModalPanel } from '../modal'
import { DialogContentProvider } from './DialogContext'
import type { ElementType } from 'react'
import type { DialogContentOwnerState, DialogContentProps } from './types'

const useSlotClasses = (ownerState: DialogContentOwnerState) => {
  const { prefix } = useNexUI()

  const { classes, size, fullScreen, placement, scroll } = ownerState

  return useMemo(() => {
    const prefixClassName = `${prefix}-dialog-content`

    const slots = {
      root: [
        'root',
        `size-${size}`,
        `scroll-${scroll}`,
        `placement-${placement}`,
        fullScreen && 'full-screen',
      ],
      paper: ['paper'],
      closeButton: ['close-button'],
    }

    return composeClasses(slots, getUtilityClass(prefixClassName), classes)
  }, [prefix, size, scroll, placement, fullScreen, classes])
}

const useSlotAriaProps = (ownerState: DialogContentOwnerState) => {
  const {
    'aria-labelledby': defaultAriaLabelledBy,
    'aria-describedby': defaultAriaDescribedBy,
  } = ownerState

  const { paper = {}, closeButton = {} } = ownerState.slotProps ?? {}

  const { 'aria-label': closeButtonAriaLabel = 'Close dialog' } = closeButton

  const {
    role = 'dialog',
    'aria-modal': modal = true,
    'aria-labelledby': ariaLabelledBy = defaultAriaLabelledBy,
    'aria-describedby': ariaDescribedBy = defaultAriaDescribedBy,
  } = paper

  return useMemo(
    () => ({
      paper: {
        role,
        'aria-modal': modal,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
      },
      closeButton: {
        'aria-label': closeButtonAriaLabel,
      },
    }),
    [role, modal, ariaLabelledBy, ariaDescribedBy, closeButtonAriaLabel],
  )
}

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
    motionProps: motionPropsProp,
    placement = 'top',
    scroll = 'outside',
    fullScreen = false,
    hideCloseButton = false,
    size = 'md',
    ...remainingProps
  } = props

  const ownerState: DialogContentOwnerState = {
    ...props,
    placement,
    scroll,
    size,
    fullScreen,
    closeIcon,
    hideCloseButton,
  }

  const styles = useStyles({
    ownerState,
    name: 'DialogContent',
    recipe: dialogContentRecipe,
  })

  const slotAriaProps = useSlotAriaProps(ownerState)

  const classes = useSlotClasses(ownerState)

  const motionProps = useMemo(() => {
    const mProps =
      typeof motionPropsProp === 'function'
        ? motionPropsProp(placement)
        : motionPropsProp

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
  }, [motionPropsProp, placement])

  const [DialogContentRoot, getDialogContentRootProps] = useSlot({
    ownerState,
    elementType: ModalPanel,
    style: styles.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    classNames: classes.root,
  })

  const [DialogContentSection, getDialogContentSectionProps] = useSlot({
    ownerState,
    elementType: ModalContent,
    style: styles.paper,
    classNames: classes.paper,
    externalSlotProps: slotProps?.paper,
    shouldForwardComponent: false,
    a11y: slotAriaProps.paper,
    additionalProps: {
      as: m.section,
      ...motionProps,
    },
  })

  const [DialogContentCloseButton, getDialogContentCloseButtonProps] = useSlot({
    ownerState,
    elementType: ButtonBase,
    externalSlotProps: slotProps?.closeButton,
    style: styles.closeButton,
    classNames: classes.closeButton,
    shouldForwardComponent: false,
    a11y: slotAriaProps.closeButton,
  })

  return (
    <DialogRoot>
      <DialogContentRoot {...getDialogContentRootProps()}>
        <DialogContentSection {...getDialogContentSectionProps()}>
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
        </DialogContentSection>
      </DialogContentRoot>
    </DialogRoot>
  )
}

DialogContent.displayName = 'DialogContent'
