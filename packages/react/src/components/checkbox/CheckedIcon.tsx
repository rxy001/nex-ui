import { LazyMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { CheckOutlined } from '@nex-ui/icons'
import { motionFeatures } from '../utils'
import type { Variants } from 'motion/react'

const tickVariants: Variants = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      opacity: {
        delay: 0.2,
        duration: 0.1,
      },
      pathLength: {
        duration: 0.2,
        delay: 0.2,
        ease: 'easeInOut',
      },
    },
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
  },
}

export type CheckedIconProps = {
  checked: boolean
  disableAnimation: boolean
}

export function CheckedIcon({ checked, disableAnimation }: CheckedIconProps) {
  if (disableAnimation) {
    if (!checked) {
      return null
    }
    return <CheckOutlined width='1.25em' height='1.25em' />
  }

  return (
    <LazyMotion features={motionFeatures}>
      <m.svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        initial={false}
        aria-hidden
        focusable={false}
        animate={checked ? 'checked' : 'unchecked'}
        width='1.25em'
        height='1.25em'
      >
        <m.path
          d='M4 12 L9 17 L20 6'
          strokeLinecap='round'
          strokeLinejoin='round'
          variants={tickVariants}
        />
      </m.svg>
    </LazyMotion>
  )
}

CheckedIcon.displayName = 'CheckedIcon'
