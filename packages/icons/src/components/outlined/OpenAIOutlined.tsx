import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import OpenAI from '../../svg/outlined/open-a-i.svg'
import type { IconProps } from '../../types'

export const OpenAIOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(OpenAI, { className: 'open-a-i-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
