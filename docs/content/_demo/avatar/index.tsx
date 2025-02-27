import useageCode from './Useage.demo?raw'
import sizesCode from './Sizes.demo?raw'
import radiusCode from './Radius.demo?raw'
import colorsCode from './Colors.demo?raw'
import fallbackCode from './Fallback.demo?raw'
import UseageDemo from './Useage.demo'
import SizesDemo from './Sizes.demo'
import RadiusDemo from './Radius.demo'
import ColorsDemo from './Colors.demo'
import FallbackDemo from './Fallback.demo'

export const avatar = {
  useage: {
    code: useageCode,
    demo: <UseageDemo />,
  },
  sizes: {
    code: sizesCode,
    demo: <SizesDemo />,
  },
  radius: {
    code: radiusCode,
    demo: <RadiusDemo />,
  },
  colors: {
    code: colorsCode,
    demo: <ColorsDemo />,
  },
  fallback: {
    code: fallbackCode,
    demo: <FallbackDemo />,
  },
}
