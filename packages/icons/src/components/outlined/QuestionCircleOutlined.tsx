'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import QuestionCircle from '../../svg/outlined/question-circle.svg'
import type { IconProps } from '../../types'

export const QuestionCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(QuestionCircle, { className: 'question-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

QuestionCircleOutlined.displayName = 'QuestionCircleOutlined'
