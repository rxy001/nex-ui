import { LazyMotion, domAnimation } from 'motion/react'
import * as m from 'motion/react-m'

const tickVariants = {
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
}

export const CheckedIcon = ({ checked }: CheckedIconProps) => {
  return (
    <LazyMotion features={domAnimation}>
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
      >
        <m.path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m7 12.9l3.143 3.6L18 7.5'
          variants={tickVariants}
        />
      </m.svg>
    </LazyMotion>
  )
}
