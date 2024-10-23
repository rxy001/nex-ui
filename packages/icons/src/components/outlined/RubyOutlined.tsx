import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Ruby from '../../svg/outlined/ruby.svg'
import type { IconProps } from '../../types'

export const RubyOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Ruby, { className: 'ruby-outlined' })
  return <Icon {...props} ref={ref} />
})
