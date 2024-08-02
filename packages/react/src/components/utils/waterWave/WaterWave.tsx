import { cloneElement, isValidElement, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { composeRef, supportRef, addEventListener } from '@nex-ui/utils'
import { WaveMotion } from './WaveMotion'
import type { WaveProps } from './types'

function showWaveMotion(node: HTMLElement) {
  const div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.top = '0px'
  div.style.left = '0px'

  node.insertBefore(div, node.firstChild)

  const root = createRoot(div)

  root.render(
    <WaveMotion
      target={node}
      onMotionFinished={() => {
        node.removeChild(div)
        root.unmount()
      }}
    />,
  )
}

export const WaterWave = ({ children, disabled }: WaveProps) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || disabled) {
      return
    }

    return addEventListener(node, 'click', () => {
      showWaveMotion(node)
    })
  }, [disabled])

  if (!isValidElement<any>(children)) {
    return children
  }

  const compoesdRef = supportRef(children)
    ? composeRef((children as any).ref, ref)
    : ref

  return cloneElement(children, { ref: compoesdRef })
}
