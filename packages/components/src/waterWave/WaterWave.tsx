import { cloneElement, isValidElement, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { composeRef, supportRef, addEventListener } from '@ant-ui/utils'
import { WaveMotion } from './WaveMotion'
import type { WaveProps } from './types'

function showWaveMotion(node: HTMLElement) {
  const div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.top = '0px'
  div.style.left = '0px'

  node.insertBefore(div, node.firstChild)

  const root = createRoot(div)

  root.render(<WaveMotion target={node} root={root} />)
}

export const WaterWave = ({ children }: WaveProps) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    return addEventListener(node, 'click', () => {
      showWaveMotion(node)
    })
  }, [])

  if (!isValidElement<any>(children)) {
    return children
  }

  const compoesdRef = supportRef(children)
    ? composeRef((children as any).ref, ref)
    : ref

  return cloneElement(children, { ref: compoesdRef })
}
