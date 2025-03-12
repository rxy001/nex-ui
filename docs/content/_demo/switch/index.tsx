import UsageDemo from './Usage.demo'
import usageCode from './Usage.demo?raw'
import DisabledDemo from './Disabled.demo'
import disabledCode from './Disabled.demo?raw'
import SizesDemo from './Sizes.demo'
import sizesCode from './Sizes.demo?raw'
import ColorsDemo from './Colors.demo'
import colorsCode from './Colors.demo?raw'
import WithIconsDemo from './WithIcons.demo'
import withIconsCode from './WithIcons.demo?raw'
import WithThumbIconDemo from './WithThumbIcon.demo'
import withThumbIconCode from './WithThumbIcon.demo?raw'
import ControlledDemo from './Controlled.demo'
import controlledCode from './Controlled.demo?raw'

export const $switch = {
  usage: {
    code: usageCode,
    demo: <UsageDemo />,
  },
  disabled: {
    code: disabledCode,
    demo: <DisabledDemo />,
  },
  sizes: {
    code: sizesCode,
    demo: <SizesDemo />,
  },
  colors: {
    code: colorsCode,
    demo: <ColorsDemo />,
  },
  withIcons: {
    code: withIconsCode,
    demo: <WithIconsDemo />,
  },
  withThumbIcon: {
    code: withThumbIconCode,
    demo: <WithThumbIconDemo />,
  },
  controlled: {
    code: controlledCode,
    demo: <ControlledDemo />,
  },
}
