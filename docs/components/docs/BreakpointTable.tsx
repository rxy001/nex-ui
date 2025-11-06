import { defaultConfig } from '@nex-ui/react'
import { TwoColumnTable } from './TwoColumnTable'

const dataSource = Object.entries(defaultConfig.breakpoints ?? {}).map(
  ([breakpoint, width]) => ({
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
