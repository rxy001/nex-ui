'use client'

import { nex } from '@nex-ui/styled'
import { addEventListener } from '@nex-ui/utils'
import { useEffect, useState } from 'react'
import { AnimatePresence, LazyMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { Portal, useSlotProps, motionFeatures } from '../utils'
import { modalRootRecipe } from '../../theme/recipes'
import { useModal } from './ModalContext'
import type { ElementType } from 'react'
import type { Variants } from 'motion/react'
import type { ModalRootProps } from './types'

const transition = {
  ease: 'easeInOut',
  duration: 0.2,
} as const

const variants: Variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
}

const style = modalRootRecipe()

export const ModalRoot = <RootComponent extends ElementType = 'div'>(
  inProps: ModalRootProps<RootComponent>,
) => {
  const { children, ...props } = inProps as ModalRootProps

  const {
    container,
    open,
    keepMounted,
    setOpen,
    preventScroll,
    closeOnEscape,
  } = useModal()

  const [display, setDisplay] = useState<'block' | 'none'>(() =>
    keepMounted ? 'none' : 'block',
  )

  if (keepMounted && open && display === 'none') {
    setDisplay('block')
  }

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
    additionalProps: {
      as: m.div,
      initial: 'hidden',
      transition,
      variants,
      ...(keepMounted
        ? {
            animate: open ? 'visible' : 'hidden',
            style: { display },
            onAnimationComplete: (animation: string) => {
              if (animation === 'hidden') {
                setDisplay('none')
              }
            },
          }
        : {
            animate: 'visible',
            exit: 'hidden',
          }),
    },
    a11y: {
      tabIndex: -1,
    },
  })

  useEffect(() => {
    if (!open || !closeOnEscape) {
      return
    }

    const removeListener = addEventListener(document.body, 'keyup', (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        e.stopPropagation()
      }
    })

    return removeListener
  }, [closeOnEscape, open, setOpen])

  useEffect(() => {
    if (preventScroll && open) {
      const body = document.querySelector('body')
      if (body) {
        body.style.overflow = 'hidden'
        return () => {
          body.style.overflow = ''
        }
      }
    }
  }, [open, preventScroll])

  return (
    <Portal container={container}>
      <LazyMotion features={motionFeatures}>
        {keepMounted ? (
          <nex.div {...rootProps}>{children}</nex.div>
        ) : (
          <AnimatePresence>
            {open ? <nex.div {...rootProps}>{children}</nex.div> : null}
          </AnimatePresence>
        )}
      </LazyMotion>
    </Portal>
  )
}

ModalRoot.displayName = 'ModalRoot'
