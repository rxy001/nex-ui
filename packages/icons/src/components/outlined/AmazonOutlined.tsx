import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Amazon from '../../svg/outlined/amazon.svg'
import type { IconProps } from '../../types'

export const AmazonOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Amazon, { className: 'amazon-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
