import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Smile from '../../svg/outlined/smile.svg'
import type { IconProps } from '../../types'

export const SmileOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Smile, { className: 'smile-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
