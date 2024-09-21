import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import QuestionCircle from '../../svg/filled/question-circle.svg'
import type { IconProps } from '../../types'

export const QuestionCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(QuestionCircle)
    return <Icon {...props} ref={ref} />
  },
)
