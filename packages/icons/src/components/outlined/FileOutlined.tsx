import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import File from '../../svg/outlined/file.svg'
import type { IconProps } from '../../types'

export const FileOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(File, { className: 'file-outlined' })
  return <Icon {...props} ref={ref} />
})
