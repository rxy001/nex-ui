import usageCode from './Usage.demo?raw'
import sizesCode from './Sizes.demo?raw'
import radiusCode from './Radius.demo?raw'
import colorsCode from './Colors.demo?raw'
import fallbackCode from './Fallback.demo?raw'
import UsageDemo from './Usage.demo'
import SizesDemo from './Sizes.demo'
import RadiusDemo from './Radius.demo'
import ColorsDemo from './Colors.demo'
import FallbackDemo from './Fallback.demo'

export const avatar = {
  usage: {
    code: usageCode,
    demo: <UsageDemo />,
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
