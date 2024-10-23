import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tags from '../../svg/filled/tags.svg'
import type { IconProps } from '../../types'

export const TagsFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Tags, { className: 'tags-filled' })
  return <Icon {...props} ref={ref} />
})
