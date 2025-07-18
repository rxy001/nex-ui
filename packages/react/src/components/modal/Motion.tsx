import {
  useAnimate,
  useMotionValue,
  AnimatePresence,
  LazyMotion,
} from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useState } from 'react'
import { motionFeatures } from '../utils'
import type { Variants } from 'motion/react'

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

interface MotionProps {
  children: React.ReactNode
  keepMounted?: boolean
  open?: boolean
}

export const Motion = ({ children, keepMounted, open }: MotionProps) => {
  const [display, setDisplay] = useState<'block' | 'none'>('none')
  const [scope, animate] = useAnimate()
  const opacity = useMotionValue(0)

  if (keepMounted && open && display === 'none') {
    setDisplay('block')
  }

  useEffect(() => {
    if (!scope.current) {
      return
    }

    const animation = async () => {
      if (open) {
        animate(opacity, 1, transition)
      } else {
        await animate(opacity, 0, transition)
        setDisplay('none')
      }
    }

    animation()
  }, [animate, opacity, open, scope])

  return (
    <LazyMotion features={motionFeatures}>
      {keepMounted ? (
        <m.div
          tabIndex={-1}
          ref={scope}
          style={{
            display,
            opacity,
          }}
        >
          {children}
        </m.div>
      ) : (
        <AnimatePresence>
          {open ? (
            <m.div
              tabIndex={-1}
              variants={variants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={transition}
            >
              {children}
            </m.div>
          ) : null}
        </AnimatePresence>
      )}
    </LazyMotion>
  )
}

Motion.displayName = 'ModalMotion'
