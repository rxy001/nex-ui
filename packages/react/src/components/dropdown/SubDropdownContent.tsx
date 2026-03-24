'use client'

import { useMemo, useState } from 'react'
import { nex } from '@nex-ui/styled'
import { chain, isNumber } from '@nex-ui/utils'
import { AnimatePresence, LazyMotion } from 'motion/react'
import { subDropdownContentRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  motionFeatures,
  FadeInOutMotion,
  useKeepMountedState,
  useSlotClasses,
} from '../utils'
import {
  DropdownContentProvider,
  useDropdownContentContext,
  useSubDropdownContext,
} from './DropdownContext'
import { SubMenuContent, MenuPortal } from '../menu'
import type { ElementType } from 'react'
import type { SubDropdownContentProps } from './types'
import type { DropdownContentContextValue } from './DropdownContext'

const slots = ['root', 'paper'] as const

export function SubDropdownContent<RootComponent extends ElementType>(
  inProps: SubDropdownContentProps<RootComponent>,
) {
  const props = useDefaultProps<SubDropdownContentProps>({
    name: 'SubDropdownContent',
    props: inProps,
  })

  const { open } = useSubDropdownContext()

  const { color: defaultColor, variant: defaultVariant } =
    useDropdownContentContext()

  const {
    children,
    container,
    keepMounted,
    motionProps,
    disableAnimation,
    classNames,
    slotProps,
    minWidth,
    maxHeight,
    color = defaultColor,
    variant = defaultVariant,
    ...remainingProps
  } = props

  const [indicatorsCount, setIndicatorsCount] = useState(0)

  const { resolvedDisplay, onAnimationComplete, onAnimationStart } =
    useKeepMountedState({
      open,
      keepMounted,
      disableAnimation,
    })

  const styles = useRecipeStyles({
    name: 'SubDropdownContent',
    recipe: subDropdownContentRecipe,
    ownerState: props,
  })

  const slotClasses = useSlotClasses({
    name: 'SubDropdownContent',
    slots,
    classNames,
  })

  const [SubDropdownContentRoot, getSubDropdownContentRoot] = useSlot({
    style: styles.root,
    component: SubMenuContent,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
    additionalProps: {
      style: {
        display: resolvedDisplay,
        '--dropdown-min-width': isNumber(minWidth) ? `${minWidth}px` : minWidth,
        '--dropdown-max-height': isNumber(maxHeight)
          ? `${maxHeight}px`
          : maxHeight,
      },
    },
  })

  const [SubDropdownContentPaper, getSubDropdownContentPaperProps] = useSlot({
    component: nex.div,
    style: styles.paper,
    classNames: slotClasses.paper,
    externalSlotProps: slotProps?.paper,
  })

  const ctx = useMemo<DropdownContentContextValue>(
    () => ({
      color,
      variant,
      indicatorsCount,
      setIndicatorsCount,
    }),
    [color, indicatorsCount, variant],
  )

  const renderPaper = () => (
    <DropdownContentProvider value={ctx}>
      <SubDropdownContentPaper {...getSubDropdownContentPaperProps()}>
        {children}
      </SubDropdownContentPaper>
    </DropdownContentProvider>
  )

  const renderContent = () => (
    <SubDropdownContentRoot {...getSubDropdownContentRoot()}>
      {disableAnimation ? (
        renderPaper()
      ) : (
        <FadeInOutMotion
          animate={open ? 'visible' : 'hidden'}
          {...motionProps}
          onAnimationStart={chain(
            onAnimationStart,
            motionProps?.onAnimationStart,
          )}
          onAnimationComplete={chain(
            onAnimationComplete,
            motionProps?.onAnimationComplete,
          )}
        >
          {renderPaper()}
        </FadeInOutMotion>
      )}
    </SubDropdownContentRoot>
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

SubDropdownContent.displayName = 'SubDropdownContent'
