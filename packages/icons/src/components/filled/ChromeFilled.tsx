import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Chrome from '../../svg/filled/chrome.svg'
import type { IconProps } from '../../types'

export const ChromeFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Chrome)
  return <Icon {...props} ref={ref} />
})
