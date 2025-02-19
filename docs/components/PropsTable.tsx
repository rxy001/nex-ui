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
          <Th className='x:w-[15%]'>Prop</Th>
          <Th>Type</Th>
          <Th className='x:w-[15%]'>Default</Th>
          <Th className='x:min-w-3xs'>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {dataSource.map((data) => (
          <Tr key={data.prop}>
            <Td className='x:text-blue-600 x:dark:text-blue-400 x:font-bold'>
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
                          <span className='x:px-2'>|</span>
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
            <Td>
              {data.default ? <DefaultItem>{data.default}</DefaultItem> : '-'}
            </Td>
            <Td>{data.description ?? '-'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
