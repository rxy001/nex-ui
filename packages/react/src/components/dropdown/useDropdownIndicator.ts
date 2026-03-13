'use client'

import { useEffect } from 'react'
import { useDropdownContentContext } from './DropdownContext'

type UseDropdownIndicatorProps = {
  trackIndicatorCount?: boolean
}

export function useDropdownIndicator(options: UseDropdownIndicatorProps = {}) {
  const { trackIndicatorCount = true } = options

  const ctx = useDropdownContentContext()

  useEffect(() => {
    if (!trackIndicatorCount) return

    ctx.setIndicatorsCount((c) => c + 1)

    return () => {
      ctx.setIndicatorsCount((c) => c - 1)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.setIndicatorsCount, trackIndicatorCount])

  const hasIndicator = ctx.indicatorsCount > 0

  return { hasIndicator }
}
