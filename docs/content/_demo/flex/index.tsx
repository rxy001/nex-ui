import useageCode from './Useage.demo?raw'
import UseageDemo from './Useage.demo'
import directionCode from './Direction.demo?raw'
import DirectionDemo from './Direction.demo'
import gapCode from './Gap.demo?raw'
import GapDemo from './Gap.demo'
import justifyCode from './Justify.demo?raw'
import JustifyDemo from './Justify.demo'
import alignCode from './Align.demo?raw'
import AlignDemo from './Align.demo'

export const flex = {
  useage: {
    code: useageCode,
    demo: <UseageDemo />,
  },
  direction: {
    code: directionCode,
    demo: <DirectionDemo />,
  },
  gap: {
    code: gapCode,
    demo: <GapDemo />,
  },
  justify: {
    code: justifyCode,
    demo: <JustifyDemo />,
  },
  align: {
    code: alignCode,
    demo: <AlignDemo />,
  },
}
