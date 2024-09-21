import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import File from '../../svg/filled/file.svg'
import type { IconProps } from '../../types'

export const FileFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(File)
  return <Icon {...props} ref={ref} />
})
