import { useMemo } from 'react'
import { ScaleInOutMotion } from '../utils'
import type { DialogPaperMotionProps } from './types'

export function DialogPaperMotion({
  children,
  motionProps,
  placement,
}: DialogPaperMotionProps) {
  const resolveMotionProps = useMemo(() => {
    const props =
      typeof motionProps === 'function' ? motionProps(placement) : motionProps

    return props
  }, [motionProps, placement])

  return <ScaleInOutMotion {...resolveMotionProps}>{children}</ScaleInOutMotion>
}

DialogPaperMotion.displayName = 'DialogPaperMotion'
