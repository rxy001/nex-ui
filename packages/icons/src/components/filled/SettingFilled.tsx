import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Setting from '../../svg/filled/setting.svg'
import type { IconProps } from '../../types'

export const SettingFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Setting, { className: 'setting-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
