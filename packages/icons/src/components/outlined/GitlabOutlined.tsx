'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gitlab from '../../svg/outlined/gitlab.svg'
import type { IconProps } from '../../types'

export const GitlabOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Gitlab, { className: 'gitlab-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

GitlabOutlined.displayName = 'GitlabOutlined'
