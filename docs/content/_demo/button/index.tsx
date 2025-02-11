import useageCode from './useage.raw'
import disabledCode from './disabled.raw'
import radiusCode from './radius.raw'
import sizesCode from './sizes.raw'
import colorsCode from './colors.raw'
import variantsCode from './variants.raw'
import loadingCode from './loading.raw'
import withIconsCode from './withIcons.raw'
import iconOnlyCode from './iconOnly.raw'
import FullWidthCode from './fullWidth.raw'
import { UseageDemo } from './Useage.demo'
import { DisabledDemo } from './Disabled.demo'
import { RadiusDemo } from './Radius.demo'
import { SizesDemo } from './Sizes.demo'
import { ColorsDemo } from './Colors.demo'
import { VariantsDemo } from './Variants.demo'
import { LoadingDemo } from './Loading.demo'
import { WithIconsDemo } from './WithIcons.demo'
import { IconOnlyDemo } from './IconOnly.demo'
import { FullWidthDemo } from './FullWidth.demo'

export const button = {
  useage: {
    code: useageCode,
    demo: <UseageDemo />,
  },
  disabled: {
    code: disabledCode,
    demo: <DisabledDemo />,
  },
  radius: {
    code: radiusCode,
    demo: <RadiusDemo />,
  },
  sizes: {
    code: sizesCode,
    demo: <SizesDemo />,
  },
  colors: {
    code: colorsCode,
    demo: <ColorsDemo />,
  },
  variants: {
    code: variantsCode,
    demo: <VariantsDemo />,
  },
  loading: {
    code: loadingCode,
    demo: <LoadingDemo />,
  },
  withIcons: {
    code: withIconsCode,
    demo: <WithIconsDemo />,
  },
  iconOnly: {
    code: iconOnlyCode,
    demo: <IconOnlyDemo />,
  },
  fullWidth: {
    code: FullWidthCode,
    demo: <FullWidthDemo />,
  },
}
