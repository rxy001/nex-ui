'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Save from '../../svg/filled/save.svg'
import type { IconProps } from '../../types'

export const SaveFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Save, { className: 'save-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

SaveFilled.displayName = 'SaveFilled'
