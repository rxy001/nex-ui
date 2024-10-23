import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gitlab from '../../svg/filled/gitlab.svg'
import type { IconProps } from '../../types'

export const GitlabFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Gitlab, { className: 'gitlab-filled' })
  return <Icon {...props} ref={ref} />
})
