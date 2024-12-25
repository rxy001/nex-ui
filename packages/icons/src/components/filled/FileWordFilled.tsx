import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileWord from '../../svg/filled/file-word.svg'
import type { IconProps } from '../../types'

export const FileWordFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileWord, { className: 'file-word-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
