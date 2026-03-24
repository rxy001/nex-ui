import * as m from 'motion/react-m'
import { useMemo } from 'react'
import { useDrawerContext } from './DrawerContext'
import type { HTMLMotionProps } from 'motion/react'
import type { DrawerPaperMotionProps } from './types'

export function DrawerPaperMotion({
  children,
  motionProps,
  placement,
}: DrawerPaperMotionProps) {
  const { open } = useDrawerContext()

  const resolvedMotionProps = useMemo<HTMLMotionProps<'div'>>(() => {
    const mProps =
      typeof motionProps === 'function' ? motionProps(placement) : motionProps

    let variants
    switch (placement) {
      case 'left':
        variants = {
          visible: {
            transform: 'translateX(0)',
          },
          hidden: {
            transform: 'translateX(-100%)',
          },
        }
        break
      case 'right':
        variants = {
          visible: {
            transform: 'translateX(0)',
          },
          hidden: {
            transform: 'translateX(100%)',
          },
        }
        break
      case 'top':
        variants = {
          visible: {
            transform: 'translateY(0)',
          },
          hidden: {
            transform: 'translateY(-100%)',
          },
        }
        break
      case 'bottom':
        variants = {
          visible: {
            transform: 'translateY(0)',
          },
          hidden: {
            transform: 'translateY(100%)',
          },
        }
        break
      default:
        variants = {}
    }

    return {
      ...mProps,
      variants: {
        ...mProps?.variants,
        visible: {
          ...variants.visible,
          ...mProps?.variants?.visible,
        },
        hidden: {
          ...variants.hidden,
          ...mProps?.variants?.hidden,
        },
      },
      transition: {
        ease: 'easeInOut',
        duration: 0.2,
        ...mProps?.transition,
      },
    }
  }, [motionProps, placement])

  return (
    <m.div
      initial='hidden'
      animate={open ? 'visible' : 'hidden'}
      {...resolvedMotionProps}
    >
      {children}
    </m.div>
  )
}

DrawerPaperMotion.displayName = 'DrawerPaperMotion'
