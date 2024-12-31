import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PaperClip from '../../svg/outlined/paper-clip.svg'
import type { IconProps } from '../../types'

export const PaperClipOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PaperClip, { className: 'paper-clip-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PaperClipOutlined.displayName = 'PaperClipOutlined'
