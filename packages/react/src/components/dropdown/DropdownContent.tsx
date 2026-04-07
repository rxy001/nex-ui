'use client'

import { nex } from '@nex-ui/styled'
import { useMemo, useState } from 'react'
import { AnimatePresence, LazyMotion } from 'motion/react'
import { dropdownContentRecipe } from '../../themes/recipes'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  motionFeatures,
  useKeepMountedState,
  useSlotClasses,
} from '../utils'
import { DropdownContentProvider, useDropdownContext } from './DropdownContext'
import { DropdownPaperMotion } from './DropdownPaperMotion'
import { MenuContent, MenuPortal } from '../menu'
import type { ElementType } from 'react'
import type { DropdownContentProps } from './types'
import type { DropdownContentContextValue } from './DropdownContext'

const slots = ['root', 'paper'] as const

export function DropdownContent<RootComponent extends ElementType>(
  inProps: DropdownContentProps<RootComponent>,
) {
  const props = useDefaultProps<DropdownContentProps>({
    name: 'DropdownContent',
    props: inProps,
  })

  const {
    children,
    container,
    keepMounted,
    motionProps,
    slotProps,
    classNames,
    minWidth = 150,
    width,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    disableAnimation = false,
    radius = 'md',
    color = 'gray',
    variant = 'solid',
    placement = 'bottom',
    size = 'md',
    ...remainingProps
  } = props

  const ownerState = {
    ...props,
    size,
    radius,
    color,
    variant,
    placement,
    disableAnimation,
  }

  const [indicatorsCount, setIndicatorsCount] = useState(0)

  const { open } = useDropdownContext()

  const { resolvedDisplay, onAnimationComplete, onAnimationStart } =
    useKeepMountedState({
      open,
      keepMounted,
      disableAnimation,
    })

  const styles = useRecipeStyles({
    ownerState,
    name: 'DropdownContent',
    recipe: dropdownContentRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'DropdownContent',
    slots,
    classNames,
  })

  const [DropdownContentRoot, getDropdownContentRoot] = useSlot({
    style: styles.root,
    component: MenuContent,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    additionalProps: {
      placement,
      style: {
        display: resolvedDisplay,
      },
    },
  })

  const [DropdownContentPaper, getDropdownContentPaperProps] = useSlot({
    component: nex.div,
    style: styles.paper,
    classNames: slotClasses.paper,
    externalSlotProps: slotProps?.paper,
    additionalProps: {
      sx: {
        minWidth,
        width,
        maxWidth,
        height,
        minHeight,
        maxHeight,
      },
    },
  })

  const ctx = useMemo<DropdownContentContextValue>(
    () => ({
      color,
      radius,
      variant,
      indicatorsCount,
      setIndicatorsCount,
      disableAnimation,
      size,
    }),
    [color, disableAnimation, indicatorsCount, radius, size, variant],
  )

  const renderPaper = () => (
    <DropdownContentProvider value={ctx}>
      <DropdownContentPaper {...getDropdownContentPaperProps()}>
        {children}
      </DropdownContentPaper>
    </DropdownContentProvider>
  )

  const renderContent = () => (
    <DropdownContentRoot {...getDropdownContentRoot()}>
      {disableAnimation ? (
        renderPaper()
      ) : (
        <DropdownPaperMotion
          placement={placement}
          motionProps={motionProps}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
        >
          {renderPaper()}
        </DropdownPaperMotion>
      )}
    </DropdownContentRoot>
  )

  const renderPortal = () =>
    open || keepMounted ? (
      <MenuPortal forceMount container={container}>
        {renderContent()}
      </MenuPortal>
    ) : null

  return disableAnimation ? (
    renderPortal()
  ) : (
    <LazyMotion features={motionFeatures}>
      <AnimatePresence initial={false}>{renderPortal()}</AnimatePresence>
    </LazyMotion>
  )
}

DropdownContent.displayName = 'DropdownContent'
