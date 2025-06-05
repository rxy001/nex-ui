'use client'

import { useEvent } from '@nex-ui/hooks'
import { clamp } from '@nex-ui/utils'
import { LazyMotion, AnimatePresence, domAnimation } from 'motion/react'
import * as m from 'motion/react-m'
import { useRef } from 'react'
import { createRoot } from 'react-dom/client'
import type { CSSProperties, MouseEvent } from 'react'
import type { Root } from 'react-dom/client'
import type { MotionProps } from 'motion/react'
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
  const ripplesRef = useRef<Ripples[]>([])

  return useEvent((event: MouseEvent) => {
    const trigger = event.currentTarget as HTMLDivElement

    if (!rootRef.current) {
      const div = document.createElement('div')
      div.style.position = 'absolute'
      div.style.left = '0'
      div.style.top = '0'
      const root = createRoot(div)
      trigger.insertBefore(div, trigger.firstChild)
      // @ts-expect-error
      root.stateNode = div
      rootRef.current = root
    }

    const { width, height, top, left } = trigger.getBoundingClientRect()
    const rippleSize = Math.max(width, height)

    let x
    let y

    if (event.clientX !== 0 && event.clientY !== 0) {
      x = event.clientX - left
      y = event.clientY - top
    } else {
      x = width / 2
      y = height / 2
    }

    ripplesRef.current.push({
      key: `${Math.random()}`,
      size: rippleSize,
      x: x - rippleSize / 2,
      y: y - rippleSize / 2,
    })

    rootRef.current.render(
      <LazyMotion features={domAnimation}>
        {ripplesRef.current.map((ripple) => {
          const duration = clamp(
            0.01 * ripple.size,
            0.2,
            ripple.size > 100 ? 0.75 : 0.5,
          )

          return (
            <AnimatePresence mode='popLayout' key={ripple.key}>
              {/* @ts-ignore */}
              <m.span
                animate={{ transform: 'scale(2)', opacity: 0 }}
                className='heroui-ripple'
                exit={{ opacity: 0 }}
                initial={{ transform: 'scale(0)', opacity: 0.35 }}
                style={{
                  position: 'absolute',
                  backgroundColor: 'currentcolor',
                  borderRadius: '100%',
                  transformOrigin: 'center',
                  pointerEvents: 'none',
                  overflow: 'hidden',
                  inset: 0,
                  zIndex: 0,
                  top: ripple.y,
                  left: ripple.x,
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  ...motionStyle,
                }}
                transition={{ duration }}
                onAnimationComplete={() => {
                  ripplesRef.current = ripplesRef.current.filter(
                    ({ key }) => ripple.key !== key,
                  )

                  if (!ripplesRef.current.length) {
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
