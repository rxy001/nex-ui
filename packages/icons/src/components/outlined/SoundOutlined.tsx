import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sound from '../../svg/outlined/sound.svg'
import type { IconProps } from '../../types'

export const SoundOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Sound, { className: 'sound-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
