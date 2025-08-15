import usageCode from './Usage.demo?raw'
import UsageDemo from './Usage.demo'
import disabledCode from './Disabled.demo?raw'
import DisabledDemo from './Disabled.demo'
import sizesCode from './Sizes.demo?raw'
import SizesDemo from './Sizes.demo'
import colorsCode from './Colors.demo?raw'
import ColorsDemo from './Colors.demo'
import defaultValueCode from './DefaultValue.demo?raw'
import DefaultValueDemo from './DefaultValue.demo'
import verticalCode from './Vertical.demo?raw'
import VerticalDemo from './Vertical.demo'
import controlledCode from './Controlled.demo?raw'
import ControlledDemo from './Controlled.demo'

export const radioGroup = {
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
  defaultValue: {
    code: defaultValueCode,
    demo: <DefaultValueDemo />,
  },
  vertical: {
    code: verticalCode,
    demo: <VerticalDemo />,
  },
  controlled: {
    code: controlledCode,
    demo: <ControlledDemo />,
  },
}
