'use client'

import { useMemo } from 'react'
import { PopperMotion, PopperPortal, PopperRoot } from '../popper'
import { useSlot, useSlotClasses, useStyles } from '../utils'
import { usePopoverContext, usePopoverPropsContext } from './PopoverContext'
import { popoverRecipe } from '../../theme/recipes'
import type { ReactElement } from 'react'
import type { PopoverPropsContextValue } from './PopoverContext'

const slots = ['root']

const useAriaProps = (ownerState: PopoverPropsContextValue) => {
  const { 'aria-modal': ariaModal, role = 'dialog' } = ownerState

  const { rootId } = usePopoverContext()

  return useMemo(
    () => ({
      role,
      id: rootId,
      'aria-modal': ariaModal,
    }),
    [ariaModal, rootId, role],
  )
}

export const PopoverRoot = ({ children }: { children: ReactElement<any> }) => {
  const { motionProps, keepMounted, container, disableAnimation, ...props } =
    usePopoverPropsContext()

  const { open, setOpen, triggerRef } = usePopoverContext()

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
    additionalProps: {
      onPointerDownOutside: (event: PointerEvent) => {
        const target = event.target as HTMLElement
        // istanbul ignore next
        if (triggerRef.current?.contains(target)) return
        if (open) setOpen(false)
      },
    },
  })

  return (
    <PopperPortal
      container={container}
      keepMounted={keepMounted}
      disableAnimation={disableAnimation}
    >
      <PopoverRootRoot {...getPopoverRootRootProps()}>
        {disableAnimation ? (
          children
        ) : (
          <PopperMotion {...motionProps}>{children}</PopperMotion>
        )}
      </PopoverRootRoot>
    </PopperPortal>
  )
}

PopoverRoot.displayName = 'PopoverRoot'
