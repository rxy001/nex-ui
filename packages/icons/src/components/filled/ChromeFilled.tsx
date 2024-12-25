import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Chrome from '../../svg/filled/chrome.svg'
import type { IconProps } from '../../types'

export const ChromeFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Chrome, { className: 'chrome-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
