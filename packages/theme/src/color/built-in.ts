import { daybreakBlue } from './daybreak-blue'
import { dustRed } from './dust-red'
import { volcano } from './volcano'

function toColorObject(colors: string[]) {
  return colors.reduce<PlainObject>(
    (obj, color, index) => ({
      ...obj,
      [index]: color,
    }),
    {},
  )
}

const object = {
  volcano,
  daybreakBlue,
  dustRed,
}

type ColorTypes = keyof typeof object

type BuiltInColors = {
  [P in ColorTypes]: ReturnType<typeof toColorObject>
}

export const builtInColors = (Object.keys(object) as ColorTypes[]).reduce(
  (obj, key) => ({
    ...obj,
    [key]: toColorObject(object[key]),
  }),
  {} as BuiltInColors,
)
