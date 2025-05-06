import { map } from '@nex-ui/utils'
import { defaultConfig } from '@nex-ui/react'
import { TwoColumnTable } from './TwoColumnTable'

const dataSource = map(defaultConfig.scales, (token: string, prop: string) => ({
  prop,
  token,
}))

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
