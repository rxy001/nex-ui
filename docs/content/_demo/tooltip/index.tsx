import TooltipDemo from './Usage.demo'
import tooltipCode from './Usage.demo?raw'
import ColorsDemo from './Colors.demo'
import colorsCode from './Colors.demo?raw'
import PlacementsDemo from './Placements.demo'
import placementsCode from './Placements.demo?raw'
import OffsetDemo from './Offset.demo'
import offsetCode from './Offset.demo?raw'
import DelayDemo from './Delay.demo'
import delayCode from './Delay.demo?raw'
import ControlledDemo from './Controlled.demo'
import controlledCode from './Controlled.demo?raw'
import SizesDemo from './Sizes.demo'
import sizesCode from './Sizes.demo?raw'
import InteractiveDemo from './Interactive.demo'
import interactiveCode from './Interactive.demo?raw'
import CustomMotionDemo from './CustomMotion.demo'
import customMotionCode from './CustomMotion.demo?raw'

export const tooltip = {
  usage: {
    code: tooltipCode,
    demo: <TooltipDemo />,
  },
  colors: {
    code: colorsCode,
    demo: <ColorsDemo />,
  },
  placements: {
    code: placementsCode,
    demo: <PlacementsDemo />,
  },
  offset: {
    code: offsetCode,
    demo: <OffsetDemo />,
  },
  delay: {
    code: delayCode,
    demo: <DelayDemo />,
  },
  controlled: {
    code: controlledCode,
    demo: <ControlledDemo />,
  },
  sizes: {
    code: sizesCode,
    demo: <SizesDemo />,
  },
  interactive: {
    code: interactiveCode,
    demo: <InteractiveDemo />,
  },
  customMotion: {
    code: customMotionCode,
    demo: <CustomMotionDemo />,
  },
}
