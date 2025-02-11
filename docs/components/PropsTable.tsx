import { Fragment } from 'react'
import type { ReactNode } from 'react'
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  HighlightItem,
  DefaultItem,
} from './Table'

type PropsTableProps = {
  dataSource: {
    prop: string
    type: string | string[]
    default?: string
    description?: ReactNode
  }[]
}

export const PropsTable = ({ dataSource = [] }: PropsTableProps) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Prop</Th>
          <Th>Type</Th>
          <Th>Default</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {dataSource.map((data) => (
          <Tr key={data.prop}>
            <Td className="x:text-blue-600 x:font-bold x:w-[15%]">
              {data.prop}
            </Td>
            <Td>
              {data.type ? (
                Array.isArray(data.type) ? (
                  data.type.map((t, i) => {
                    return (
                      <Fragment key={t}>
                        <HighlightItem>{t}</HighlightItem>
                        {i === data.type.length - 1 ? null : (
                          <span className="x:px-2">|</span>
                        )}
                      </Fragment>
                    )
                  })
                ) : (
                  <HighlightItem>{data.type}</HighlightItem>
                )
              ) : (
                '-'
              )}
            </Td>
            <Td className="x:w-[15%]">
              {data.default ? <DefaultItem>{data.default}</DefaultItem> : '-'}
            </Td>
            <Td className="x:min-w-3xs">{data.description ?? '-'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
