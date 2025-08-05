import usageCode from './Usage.demo?raw'
import UsageDemo from './Usage.demo'
import sizesCode from './Sizes.demo?raw'
import SizesDemo from './Sizes.demo'
import placementsCode from './Placements.demo?raw'
import PlacementsDemo from './Placements.demo'
import hideBackdropCode from './HideBackdrop.demo?raw'
import HideBackdropDemo from './HideBackdrop.demo'
import PreventScrollCode from './PreventScroll.demo?raw'
import PreventScrollDemo from './PreventScroll.demo'
import KeepMountedCode from './KeepMounted.demo?raw'
import KeepMountedDemo from './KeepMounted.demo'
import controlledCode from './Controlled.demo?raw'
import ControlledDemo from './Controlled.demo'
import customMotionCode from './CustomMotion.demo?raw'
import CustomMotionDemo from './CustomMotion.demo'

export const drawer = {
  usage: {
    code: usageCode,
    demo: <UsageDemo />,
  },
  sizes: {
    code: sizesCode,
    demo: <SizesDemo />,
  },
  placements: {
    code: placementsCode,
    demo: <PlacementsDemo />,
  },
  hideBackdrop: {
    code: hideBackdropCode,
    demo: <HideBackdropDemo />,
  },
  preventScroll: {
    code: PreventScrollCode,
    demo: <PreventScrollDemo />,
  },
  keepMounted: {
    code: KeepMountedCode,
    demo: <KeepMountedDemo />,
  },
  controlled: {
    code: controlledCode,
    demo: <ControlledDemo />,
  },
  customMotion: {
    code: customMotionCode,
    demo: <CustomMotionDemo />,
  },
}
