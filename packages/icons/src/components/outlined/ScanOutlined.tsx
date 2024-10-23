import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Scan from '../../svg/outlined/scan.svg'
import type { IconProps } from '../../types'

export const ScanOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Scan, { className: 'scan-outlined' })
  return <Icon {...props} ref={ref} />
})
