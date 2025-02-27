import useageCode from './useage.raw'
import sizesCode from './sizes.raw'
import radiusCode from './radius.raw'
import colorsCode from './colors.raw'
import fallbackCode from './fallback.raw'
import { UseageDemo } from './Useage.demo'
import { SizesDemo } from './Sizes.demo'
import { RadiusDemo } from './Radius.demo'
import { ColorsDemo } from './Colors.demo'
import { FallbackDemo } from './Fallback.demo'

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
