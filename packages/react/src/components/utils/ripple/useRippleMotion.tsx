import { useEvent } from '@nex-ui/hooks'
import { clamp } from '@nex-ui/utils'
import type { MotionProps } from 'motion/react'
import { LazyMotion, AnimatePresence, domAnimation } from 'motion/react'
import * as m from 'motion/react-m'
import type { CSSProperties } from 'react'
import { useRef } from 'react'
import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import type { Ripples } from './types'

// TODO: motion 的 async load 和 types 有 bug
// const loadFeatures = import('./features').then((res) => res.default)

export type UseRippleMotionProps = {
  motionProps?: MotionProps
  motionStyle?: CSSProperties
}

export const useRippleMotion = (props?: UseRippleMotionProps) => {
  const { motionProps, motionStyle } = props ?? {}
  const rootRef = useRef<Root | null>(null)
  const ripples = useRef<Ripples[]>([])

  return useEvent((event: MouseEvent) => {
    const trigger = event.currentTarget as HTMLDivElement

    if (!rootRef.current) {
      const div = document.createElement('div')
      const root = createRoot(div)
      trigger.insertBefore(div, trigger.firstChild)
      // @ts-expect-error
      root.stateNode = div
      rootRef.current = root
    }

    const { width, height, top, left } = trigger.getBoundingClientRect()
    const rippleSize = Math.max(width, height)

    ripples.current.push({
      key: `${Math.random()}`,
      size: rippleSize,
      x: event.clientX - left - rippleSize / 2,
      y: event.clientY - top - rippleSize / 2,
    })

    rootRef.current.render(
      <LazyMotion features={domAnimation}>
        {ripples.current.map((ripple) => {
          const duration = clamp(
            0.01 * ripple.size,
            0.2,
            ripple.size > 100 ? 0.75 : 0.5,
          )

          return (
            <AnimatePresence mode='popLayout' key={ripple.key}>
              <m.span
                animate={{ transform: 'scale(2)', opacity: 0 }}
                className='heroui-ripple'
                exit={{ opacity: 0 }}
                initial={{ transform: 'scale(0)', opacity: 0.35 }}
                style={{
                  // @ts-ignore
                  position: 'absolute',
                  // @ts-ignore
                  backgroundColor: 'currentcolor',
                  // @ts-ignore
                  borderRadius: '100%',
                  // @ts-ignore
                  transformOrigin: 'center',
                  // @ts-ignore
                  pointerEvents: 'none',
                  // @ts-ignore
                  overflow: 'hidden',
                  // @ts-ignore
                  inset: 0,
                  // @ts-ignore
                  zIndex: 0,
                  // @ts-ignore
                  top: ripple.y,
                  // @ts-ignore
                  left: ripple.x,
                  // @ts-ignore
                  width: `${ripple.size}px`,
                  // @ts-ignore
                  height: `${ripple.size}px`,
                  ...motionStyle,
                }}
                transition={{ duration }}
                onAnimationComplete={() => {
                  ripples.current = ripples.current.filter(
                    ({ key }) => ripple.key !== key,
                  )

                  if (!ripples.current.length) {
                    rootRef.current?.unmount()
                    // @ts-expect-error
                    trigger.removeChild(rootRef.current.stateNode)
                    rootRef.current = null
                  }
                }}
                {...motionProps}
              />
            </AnimatePresence>
          )
        })}
      </LazyMotion>,
    )
  })
}
