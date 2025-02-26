import { TwoColumnTable } from './TwoColumnTable'

const columns = [
  {
    title: 'Token',
    dataIndex: 'token',
  },
  { title: 'Value', dataIndex: 'value' },
] as const

type TokenTableProps = {
  dataSource: { token: string; value: string }[]
}

export function TokenTable({ dataSource }: TokenTableProps) {
  return <TwoColumnTable columns={columns} dataSource={dataSource} />
}
