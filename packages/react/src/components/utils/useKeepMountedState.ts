import { useCallback, useMemo, useState } from 'react'

type UseKeepMountedStateProps = {
  open: boolean
  keepMounted?: boolean
  disableAnimation?: boolean
  displayValue?: string
}

type UseKeepMountedStateResult = {
  resolvedDisplay?: string
  onAnimationStart: (animation: string) => void
  onAnimationComplete: (animation: string) => void
}

export const useKeepMountedState = ({
  open,
  keepMounted = false,
  disableAnimation = false,
  displayValue = 'block',
}: UseKeepMountedStateProps): UseKeepMountedStateResult => {
  const [display, setDisplay] = useState(
    keepMounted && !disableAnimation && open,
  )

  if (keepMounted && open && !disableAnimation && !display) {
    setDisplay(true)
  }

  const resolvedDisplay = useMemo(() => {
    if (!keepMounted) return undefined
    const visible = disableAnimation ? open : display
    return visible ? displayValue : 'none'
  }, [keepMounted, disableAnimation, open, display, displayValue])

  const onAnimationStart = useCallback(
    (animation: string) => {
      if (keepMounted && animation === 'visible') setDisplay(true)
    },
    [keepMounted],
  )

  const onAnimationComplete = useCallback(
    (animation: string) => {
      if (keepMounted && animation === 'hidden') setDisplay(false)
    },
    [keepMounted],
  )

  return {
    resolvedDisplay,
    onAnimationStart,
    onAnimationComplete,
  }
}
