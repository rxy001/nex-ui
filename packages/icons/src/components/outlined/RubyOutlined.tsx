'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Ruby from '../../svg/outlined/ruby.svg'
import type { IconProps } from '../../types'

export const RubyOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Ruby, { className: 'ruby-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RubyOutlined.displayName = 'RubyOutlined'
