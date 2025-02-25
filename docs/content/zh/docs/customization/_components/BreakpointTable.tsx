import { map } from '@nex-ui/utils'
import { defaultConfig } from '@nex-ui/react'
import { TwoColumnTable } from './TwoColumnTable'

const dataSource = map(
  defaultConfig.breakpoints,
  (width: string, breakpoint: string) => ({
    breakpoint,
    width,
  }),
)

const columns = [
  {
    title: 'Breakpoint',
    dataIndex: 'breakpoint',
  },
  {
    title: 'Screen Width',
    dataIndex: 'width',
  },
] as const

export function BreakpointTable() {
  return <TwoColumnTable columns={columns} dataSource={dataSource} />
}
