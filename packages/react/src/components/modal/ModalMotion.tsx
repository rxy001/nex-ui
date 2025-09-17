'use client'

import { nex } from '@nex-ui/styled'
import { useState } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { AnimatePresence, LazyMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { motionFeatures } from '../utils'
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

interface ModalMotionProps extends HTMLMotionProps<'div'> {
  keepMounted?: boolean
  children?: ReactNode | MotionValue<string> | MotionValue<number>
  open?: boolean
}

export const ModalMotion = ({
  keepMounted,
  children,
  open,
  ...props
}: ModalMotionProps) => {
  const [display, setDisplay] = useState<'block' | 'none'>(() =>
    keepMounted ? 'none' : 'block',
  )

  if (keepMounted && open && display === 'none') {
    setDisplay('block')
  }

  const onAnimationComplete = useEvent((animation: string) => {
    if (animation === 'hidden') {
      if (keepMounted) setDisplay('none')
    }
    props.onAnimationComplete?.(animation)
  })

  return (
    <LazyMotion features={motionFeatures}>
      {keepMounted ? (
        <nex.div
          as={m.div}
          initial='hidden'
          animate={open ? 'visible' : 'hidden'}
          transition={transition}
          variants={variants}
          {...props}
          style={{ display, ...props.style }}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </nex.div>
      ) : (
        <AnimatePresence>
          {open ? (
            <nex.div
              as={m.div}
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={transition}
              variants={variants}
              {...props}
              onAnimationComplete={onAnimationComplete}
            >
              {children}
            </nex.div>
          ) : null}
        </AnimatePresence>
      )}
    </LazyMotion>
  )
}

ModalMotion.displayName = 'ModalMotion'
