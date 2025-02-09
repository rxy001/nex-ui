'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Skype from '../../svg/filled/skype.svg'
import type { IconProps } from '../../types'

export const SkypeFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Skype, { className: 'skype-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SkypeFilled.displayName = 'SkypeFilled'
