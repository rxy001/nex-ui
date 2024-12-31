import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Ie from '../../svg/outlined/ie.svg'
import type { IconProps } from '../../types'

export const IeOutlined = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Ie, { className: 'ie-outlined' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

IeOutlined.displayName = 'IeOutlined'
