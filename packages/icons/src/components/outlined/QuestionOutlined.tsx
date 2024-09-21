import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Question from '../../svg/outlined/question.svg'
import type { IconProps } from '../../types'

export const QuestionOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Question)
    return <Icon {...props} ref={ref} />
  },
)
