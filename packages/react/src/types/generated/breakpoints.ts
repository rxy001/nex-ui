import type { Overwrite } from '../utils'

export interface BreakpointsOverrides {}

export type Breakpoints = Overwrite<DefaultBreakpoints, BreakpointsOverrides>

export interface DefaultBreakpoints {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}
