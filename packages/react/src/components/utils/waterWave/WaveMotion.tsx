import { useAnimate } from 'framer-motion'
import { useEffect } from 'react'
import { getWaveColor } from './utils'
import type { WaveMotionProps } from './types'

export const WaveMotion = ({ target, onMotionFinished }: WaveMotionProps) => {
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
    ).then(onMotionFinished)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, scope])

  return (
    <div
      ref={scope}
      style={{
        width,
        height,
        borderRadius,
        inset: '-1px',
        position: 'absolute',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  )
}
