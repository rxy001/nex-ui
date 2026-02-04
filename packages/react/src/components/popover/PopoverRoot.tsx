'use client'

import { PopperContent, PopperMotion, PopperPortal } from '../popper'
import { useSlot, useSlotClasses, useStyles } from '../utils'
import { usePopoverContext, usePopoverPropsContext } from './PopoverContext'
import { popoverRecipe } from '../../theme/recipes'
import type { ReactElement } from 'react'
import type { PointerDownOutsideEvent } from '../dismissibleLayer'

const slots = ['root']

export const PopoverRoot = ({ children }: { children: ReactElement }) => {
  const { motionProps, keepMounted, container, disableAnimation, ...props } =
    usePopoverPropsContext()

  const { triggerRef } = usePopoverContext()

  const slotClasses = useSlotClasses({
    name: 'Popover',
    slots,
  })

  const style = useStyles({
    ownerState: props,
    name: 'Popover',
    recipe: popoverRecipe,
  })

  const [PopoverRootRoot, getPopoverRootRootProps] = useSlot({
    style,
    elementType: PopperContent,
    shouldForwardComponent: false,
    externalForwardedProps: props,
    classNames: slotClasses.root,
    additionalProps: {
      onPointerDownOutside: (event: PointerDownOutsideEvent) => {
        const target = event.target as HTMLElement
        if (triggerRef.current?.contains(target)) {
          event.preventDefault()
        }
      },
    },
    dataAttrs: {
      disableAnimation,
    },
  })

  const renderPopoverRootRoot = () => {
    return (
      <PopoverRootRoot {...getPopoverRootRootProps()}>
        {children}
      </PopoverRootRoot>
    )
  }

  return (
    <PopperPortal
      container={container}
      keepMounted={keepMounted}
      disablePresence={disableAnimation}
    >
      {disableAnimation ? (
        renderPopoverRootRoot()
      ) : (
        <PopperMotion {...motionProps}>{renderPopoverRootRoot()}</PopperMotion>
      )}
    </PopperPortal>
  )
}

PopoverRoot.displayName = 'PopoverRoot'
