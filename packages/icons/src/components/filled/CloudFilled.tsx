import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Cloud from '../../svg/filled/cloud.svg'
import type { IconProps } from '../../types'

export const CloudFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Cloud, { className: 'cloud-filled' })
  return <Icon {...props} ref={ref} />
})
