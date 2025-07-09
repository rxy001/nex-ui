'use client'

import { nex } from '@nex-ui/styled'
import { addEventListener } from '@nex-ui/utils'
import * as m from 'motion/react-m'
import { LazyMotion, AnimatePresence } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Portal, motionFeatures, useSlotProps } from '../utils'
import { modalRootRecipe } from '../../theme/recipes'
import { useModal } from './ModalContext'
import type { ElementType } from 'react'
import type { Variants } from 'motion/react'
import type { ModalRootProps } from './types'

const variants: Variants = {
  visible: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
}

const style = modalRootRecipe()

export const ModalRoot = <RootComponent extends ElementType = 'div'>(
  inProps: ModalRootProps<RootComponent>,
) => {
  const props = inProps as ModalRootProps

  const {
    container,
    open,
    keepMounted,
    setOpen,
    preventScroll,
    closeOnEscape,
  } = useModal()

  const mountedRef = useRef(false)
  const [hasAnimation, setHasAnimation] = useState(false)

  if (open && hasAnimation === false) {
    // The execution of onAnimationStart for motion components occurs later than the component's rendering.
    setHasAnimation(true)
  }

  if (open && keepMounted === true && mountedRef.current === false) {
    mountedRef.current = true
  }

  const motionProps = {
    animate: open ? 'visible' : 'hidden',
    initial: 'hidden',
    exit: 'hidden',
  }

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
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
    <LazyMotion features={motionFeatures}>
      {keepMounted ? (
        mountedRef.current && (
          <Portal container={container}>
            <m.div
              tabIndex={-1}
              variants={variants}
              style={{
                display: open || hasAnimation ? 'block' : 'none',
              }}
              onAnimationComplete={(animation) => {
                if (animation === 'hidden') {
                  setHasAnimation(false)
                }
              }}
              {...motionProps}
            >
              <nex.div {...rootProps} />
            </m.div>
          </Portal>
        )
      ) : (
        <AnimatePresence>
          {open && (
            <Portal container={container}>
              <m.div tabIndex={-1} variants={variants} {...motionProps}>
                <nex.div {...rootProps} />
              </m.div>
            </Portal>
          )}
        </AnimatePresence>
      )}
    </LazyMotion>
  )
}

ModalRoot.displayName = 'ModalRoot'
