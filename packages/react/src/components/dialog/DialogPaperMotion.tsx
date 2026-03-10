import { useMemo } from 'react'
import { ScaleInOutMotion } from '../utils'
import { useDialogContext } from './DialogContext'
import type { DialogPaperMotionProps } from './types'

export const DialogPaperMotion = ({
  children,
  motionProps,
  placement,
}: DialogPaperMotionProps) => {
  const { open } = useDialogContext()

  const resolveMotionProps = useMemo(() => {
    return typeof motionProps === 'function'
      ? motionProps(placement)
      : motionProps
  }, [motionProps, placement])

  return (
    <ScaleInOutMotion
      animate={open ? 'visible' : 'hidden'}
      {...resolveMotionProps}
    >
      {children}
    </ScaleInOutMotion>
  )
}

DialogPaperMotion.displayName = 'DialogPaperMotion'
