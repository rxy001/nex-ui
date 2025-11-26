'use client'

import { useMemo } from 'react'
import { PopperMotion, PopperPortal, PopperRoot, usePopper } from '../popper'
import { useSlot, useSlotClasses, useStyles } from '../utils'
import { usePopover } from './PopoverContext'
import { FocusTrap } from '../focusTrap'
import { popoverRecipe } from '../../theme/recipes'
import type { ReactElement } from 'react'
import type { PopoverContextValue } from './PopoverContext'

const slots = ['root']

const useAriaProps = (ownerState: PopoverContextValue) => {
  const { id, 'aria-modal': ariaModal, role = 'dialog' } = ownerState

  return useMemo(
    () => ({
      id,
      role,
      'aria-modal': ariaModal,
    }),
    [ariaModal, id, role],
  )
}

export const PopoverRoot = ({ children }: { children: ReactElement<any> }) => {
  const {
    motionProps,
    keepMounted,
    container,
    restoreFocus,
    animateDisabled,
    ...props
  } = usePopover()

  const { open } = usePopper()

  const slotClasses = useSlotClasses({
    name: 'Popover',
    slots,
  })

  const style = useStyles({
    ownerState: props,
    name: 'Popover',
    recipe: popoverRecipe,
  })

  const ariaProps = useAriaProps(props)

  const [PopoverRootRoot, getPopoverRootRootProps] = useSlot({
    style,
    elementType: PopperRoot,
    shouldForwardComponent: false,
    externalForwardedProps: props,
    classNames: slotClasses.root,
    a11y: ariaProps,
  })

  const renderChildren = () => (
    <FocusTrap active={open} restoreFocus={restoreFocus}>
      {children}
    </FocusTrap>
  )

  return (
    <PopperPortal
      container={container}
      keepMounted={keepMounted}
      animateDisabled={animateDisabled}
    >
      <PopoverRootRoot {...getPopoverRootRootProps()}>
        {animateDisabled ? (
          renderChildren()
        ) : (
          <PopperMotion {...motionProps}>{renderChildren()}</PopperMotion>
        )}
      </PopoverRootRoot>
    </PopperPortal>
  )
}

PopoverRoot.displayName = 'PopoverRoot'
