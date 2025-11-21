'use client'

import { useState } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { AnimatePresence, LazyMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { motionFeatures } from './motionFeatures'
import type { MotionValue, Variants } from 'motion/react'
import type { ReactNode } from 'react'
import type { HTMLMotionProps } from '../../types/utils'

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

export interface PresenceMotionProps extends HTMLMotionProps<'div'> {
  keepMounted?: boolean
  children?: ReactNode | MotionValue<string> | MotionValue<number>
  open?: boolean
}

export const PresenceMotion = ({
  keepMounted,
  children,
  open,
  ...props
}: PresenceMotionProps) => {
  const [display, setDisplay] = useState<'block' | 'none'>(() =>
    keepMounted ? 'none' : 'block',
  )

  if (keepMounted && open && display === 'none') {
    setDisplay('block')
  }

  const onAnimationComplete = useEvent((animation: string) => {
    if (animation === 'hidden' && keepMounted) setDisplay('none')
    props.onAnimationComplete?.(animation)
  })

  return (
    <LazyMotion features={motionFeatures}>
      {keepMounted ? (
        <m.div
          initial='hidden'
          animate={open ? 'visible' : 'hidden'}
          transition={transition}
          variants={variants}
          {...props}
          style={{ ...props.style, display }}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </m.div>
      ) : (
        <AnimatePresence propagate>
          {open ? (
            <m.div
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={transition}
              variants={variants}
              {...props}
              onAnimationComplete={onAnimationComplete}
            >
              {children}
            </m.div>
          ) : null}
        </AnimatePresence>
      )}
    </LazyMotion>
  )
}

PresenceMotion.displayName = 'PresenceMotion'
