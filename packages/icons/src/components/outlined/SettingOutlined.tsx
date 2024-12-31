import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Setting from '../../svg/outlined/setting.svg'
import type { IconProps } from '../../types'

export const SettingOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Setting, { className: 'setting-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SettingOutlined.displayName = 'SettingOutlined'
