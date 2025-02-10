import type { ReactNode } from 'react'

type TableProps = {
  dataSource: {
    prop: string
    type: string
    default: string
    description: string
  }[]
}

const Item = ({ children }: { children: ReactNode }) => (
  <span className="x:bg-[#ebf5ff] x:inline-block x:px-1.5 x:rounded-sm x:text-gray-600 x:border x:border-[#cce5ffcc]">
    {children}
  </span>
)

export const PropsTable = ({ dataSource = [] }: TableProps) => {
  return (
    <table className="x:w-full">
      <thead>
        <tr className="x:border-b x:text-left x:border-gray-200 x:dark:border-gray-600 x:font-semibold">
          <th className="x:py-4 x:pr-4">Prop</th>
          <th className="x:py-4 x:pr-4 x:w-[40%]">Type</th>
          <th className="x:py-4 x:pr-4">Default</th>
          <th className="x:py-4 x:pr-4">Description</th>
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data) => (
          <tr className="x:border-b x:text-left x:border-gray-200 x:dark:border-gray-600 x:text-sm">
            <td className="x:py-4 x:pr-4 x:text-blue-600 x:font-medium">
              {data.prop}
            </td>
            <td className="x:py-4 x:pr-4 x:flex x:flex-wrap x:gap-2">
              {data.type.split('|').map((t, i, array) => {
                return (
                  <>
                    <Item>{t}</Item>
                    {i === array.length - 1 ? null : '|'}
                  </>
                )
              })}
            </td>
            <td className="x:py-4 x:pr-4">
              <Item>{data.default}</Item>
            </td>
            <td className="x:py-4 x:pr-4">{data.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
