'use client'

import { useMemo } from 'react'
import { PopperMotion, PopperPortal, PopperRoot, usePopper } from '../popper'
import { useSlot, useSlotClasses, useStyles } from '../utils'
import { usePopoverProps } from './PopoverContext'
import { popoverRecipe } from '../../theme/recipes'
import type { ReactElement } from 'react'
import type { PopoverPropsContextValue } from './PopoverContext'

const slots = ['root']

const useAriaProps = (ownerState: PopoverPropsContextValue) => {
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
  const { motionProps, keepMounted, container, disableAnimation, ...props } =
    usePopoverProps()

  const { open, setOpen, referenceRef } = usePopper()

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
        if (referenceRef.current?.contains(target)) return
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
