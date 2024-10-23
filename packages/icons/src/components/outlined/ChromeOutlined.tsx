import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Chrome from '../../svg/outlined/chrome.svg'
import type { IconProps } from '../../types'

export const ChromeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Chrome, { className: 'chrome-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
