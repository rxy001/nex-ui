import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tag from '../../svg/filled/tag.svg'
import type { IconProps } from '../../types'

export const TagFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Tag)
  return <Icon {...props} ref={ref} />
})
