import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import File from '../../svg/filled/file.svg'
import type { IconProps } from '../../types'

export const FileFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(File, { className: 'file-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
