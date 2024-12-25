import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import QuestionCircle from '../../svg/filled/question-circle.svg'
import type { IconProps } from '../../types'

export const QuestionCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(QuestionCircle, { className: 'question-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
