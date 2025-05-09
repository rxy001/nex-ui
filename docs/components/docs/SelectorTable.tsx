import { map } from '@nex-ui/utils'
import { defaultConfig } from '@nex-ui/react'
import { TwoColumnTable } from './TwoColumnTable'

const dataSource = map(
  defaultConfig.selectors,
  (value: string, selector: string) => ({ selector, value }),
)

const columns = [
  {
    title: 'Selector',
    dataIndex: 'selector',
    className: 'x:w-[25%]!',
  },
  { title: 'Value', dataIndex: 'value' },
] as const

export function SelectorTable() {
  return <TwoColumnTable columns={columns} dataSource={dataSource} />
}
