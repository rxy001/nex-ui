import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fall from '../../svg/outlined/fall.svg'
import type { IconProps } from '../../types'

export const FallOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Fall)
  return <Icon {...props} ref={ref} />
})
