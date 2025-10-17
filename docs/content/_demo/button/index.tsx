import usageCode from './Usage.demo?raw'
import disabledCode from './Disabled.demo?raw'
import radiiCode from './Radii.demo?raw'
import sizesCode from './Sizes.demo?raw'
import colorsCode from './Colors.demo?raw'
import variantsCode from './Variants.demo?raw'
import loadingCode from './Loading.demo?raw'
import withIconsCode from './WithIcons.demo?raw'
import iconOnlyCode from './IconOnly.demo?raw'
import UsageDemo from './Usage.demo'
import DisabledDemo from './Disabled.demo'
import RadiiDemo from './Radii.demo'
import SizesDemo from './Sizes.demo'
import ColorsDemo from './Colors.demo'
import VariantsDemo from './Variants.demo'
import LoadingDemo from './Loading.demo'
import WithIconsDemo from './WithIcons.demo'
import IconOnlyDemo from './IconOnly.demo'

export const button = {
  usage: {
    code: usageCode,
    demo: <UsageDemo />,
  },
  disabled: {
    code: disabledCode,
    demo: <DisabledDemo />,
  },
  radii: {
    code: radiiCode,
    demo: <RadiiDemo />,
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
}
