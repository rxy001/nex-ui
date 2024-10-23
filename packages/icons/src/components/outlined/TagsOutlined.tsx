import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tags from '../../svg/outlined/tags.svg'
import type { IconProps } from '../../types'

export const TagsOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Tags, { className: 'tags-outlined' })
  return <Icon {...props} ref={ref} />
})
