import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Skype from '../../svg/outlined/skype.svg'
import type { IconProps } from '../../types'

export const SkypeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Skype, { className: 'skype-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
