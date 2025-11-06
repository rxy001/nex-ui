import { defaultConfig } from '@nex-ui/react'
import { TwoColumnTable } from './TwoColumnTable'

const dataSource = Object.entries(defaultConfig.scales ?? {}).map(
  ([prop, token]) => ({
    prop,
    token,
  }),
)

const columns = [
  {
    title: 'CSS Property',
    dataIndex: 'prop',
  },
  {
    title: 'Token Category',
    dataIndex: 'token',
  },
] as const

export function ScaleTable() {
  return <TwoColumnTable columns={columns} dataSource={dataSource} />
}
