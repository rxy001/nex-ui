import usageCode from './Usage.demo?raw'
import UsageDemo from './Usage.demo'
import disabledCode from './Disabled.demo?raw'
import DisabledDemo from './Disabled.demo'
import sizesCode from './Sizes.demo?raw'
import SizesDemo from './Sizes.demo'
import colorsCode from './Colors.demo?raw'
import ColorsDemo from './Colors.demo'
import iconCode from './Icon.demo?raw'
import IconDemo from './Icon.demo'
import controlledCode from './Controlled.demo?raw'
import ControlledDemo from './Controlled.demo'
import groupUseageCode from './GroupUseage.demo?raw'
import GroupUseageDemo from './GroupUseage.demo'
import groupVerticalCode from './GroupVertical.demo?raw'
import GroupVerticalDemo from './GroupVertical.demo'
import groupDisabledCode from './GroupDisabled.demo?raw'
import GroupDisabledDemo from './GroupDisabled.demo'

export const checkbox = {
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
  icon: {
    code: iconCode,
    demo: <IconDemo />,
  },
  controlled: {
    code: controlledCode,
    demo: <ControlledDemo />,
  },
  groupUseage: {
    code: groupUseageCode,
    demo: <GroupUseageDemo />,
  },
  groupVertical: {
    code: groupVerticalCode,
    demo: <GroupVerticalDemo />,
  },
  groupDisabled: {
    code: groupDisabledCode,
    demo: <GroupDisabledDemo />,
  },
}
