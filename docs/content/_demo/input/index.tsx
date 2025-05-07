import usageCode from './Usage.demo?raw'
import UsageDemo from './Usage.demo'
import disabledCode from './Disabled.demo?raw'
import DisabledDemo from './Disabled.demo'
import readOnlyCode from './ReadOnly.demo?raw'
import ReadOnlyDemo from './ReadOnly.demo'
import variantsCode from './Variants.demo?raw'
import VariantsDemo from './Variants.demo'
import sizesCode from './Sizes.demo?raw'
import SizesDemo from './Sizes.demo'
import labelPlacementsCode from './LabelPlacements.demo?raw'
import LabelPlacementsDemo from './LabelPlacements.demo'
import clearableCode from './Clearable.demo?raw'
import ClearableDemo from './Clearable.demo'
import invalidCode from './Invalid.demo?raw'
import InvalidDemo from './Invalid.demo'
import colorsCode from './Colors.demo?raw'
import ColorsDemo from './Colors.demo'
import adornmentCode from './Adornment.demo?raw'
import AdornmentDemo from './Adornment.demo'

export const input = {
  usage: {
    code: usageCode,
    demo: <UsageDemo />,
  },
  disabled: {
    code: disabledCode,
    demo: <DisabledDemo />,
  },
  readOnly: {
    code: readOnlyCode,
    demo: <ReadOnlyDemo />,
  },
  variants: {
    code: variantsCode,
    demo: <VariantsDemo />,
  },
  sizes: {
    code: sizesCode,
    demo: <SizesDemo />,
  },
  labelPlacements: {
    code: labelPlacementsCode,
    demo: <LabelPlacementsDemo />,
  },
  clearable: {
    code: clearableCode,
    demo: <ClearableDemo />,
  },
  invalid: {
    code: invalidCode,
    demo: <InvalidDemo />,
  },
  colors: {
    code: colorsCode,
    demo: <ColorsDemo />,
  },
  icons: {
    code: adornmentCode,
    demo: <AdornmentDemo />,
  },
}
