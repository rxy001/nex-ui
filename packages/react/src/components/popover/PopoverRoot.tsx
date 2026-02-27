'use client'

import { PopperContent, PopperMotion, PopperPortal } from '../popper'
import { useSlot, useSlotClasses, useRecipeStyles } from '../utils'
import { usePopoverContext, usePopoverPropsContext } from './PopoverContext'
import { popoverRecipe } from '../../theme/recipes'
import type { ReactElement } from 'react'
import type { PointerDownOutsideEvent } from '../dismissibleLayer'

const slots = ['root'] as const

export const PopoverRoot = ({ children }: { children: ReactElement }) => {
  const { motionProps, keepMounted, container, disableAnimation, ...props } =
    usePopoverPropsContext()

  const { triggerRef } = usePopoverContext()

  const slotClasses = useSlotClasses({
    name: 'Popover',
    slots,
  })

  const style = useRecipeStyles({
    ownerState: props,
    name: 'Popover',
    recipe: popoverRecipe,
  })

  const [PopoverRootRoot, getPopoverRootRootProps] = useSlot({
    style,
    component: PopperContent,
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
