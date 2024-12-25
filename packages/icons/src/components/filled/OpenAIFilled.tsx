import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import OpenAI from '../../svg/filled/open-a-i.svg'
import type { IconProps } from '../../types'

export const OpenAIFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(OpenAI, { className: 'open-a-i-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
