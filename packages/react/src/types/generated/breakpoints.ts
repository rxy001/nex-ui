import type { Overwrite } from '../utils'

export interface BreakpointsOverrides {}

export type Breakpoints = Overwrite<DefaultBreakpoints, BreakpointsOverrides>

export interface DefaultBreakpoints {
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}
