import { wave } from '@wui/theme'
import { motion, useAnimate } from 'framer-motion'
import { useEffect } from 'react'
import { getWaveColor } from './utils'
import type { WaveMotionProps } from './types'

export const WaveMotion = ({ target, root }: WaveMotionProps) => {
  const { borderRadius, width, height } = window.getComputedStyle(target)
  const color = getWaveColor(target)

  const [scope, animate] = useAnimate<HTMLDivElement>()

  useEffect(() => {
    animate(
      scope.current,
      {
        opacity: [0, 0.3, 0],
        boxShadow: [`0 0 0 0px ${color}`, `0 0 0 6px ${color}`],
      },
      {
        duration: 0.6,
        ease: 'easeInOut',
      },
    ).then(() => {
      const parent = scope.current.parentElement!
      root.unmount()
      target.removeChild(parent)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, scope])

  return (
    <motion.div
      ref={scope}
      className={wave()}
      style={{ width, height, borderRadius }}
    />
  )
}
