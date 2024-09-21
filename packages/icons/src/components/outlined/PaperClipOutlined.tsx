import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PaperClip from '../../svg/outlined/paper-clip.svg'
import type { IconProps } from '../../types'

export const PaperClipOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PaperClip)
    return <Icon {...props} ref={ref} />
  },
)
