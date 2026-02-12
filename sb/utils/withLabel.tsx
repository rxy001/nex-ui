import type { ReactNode } from 'react'

const addSpacesBeforeCaps = (label: string) =>
  label.replace(/([a-z0-9])([A-Z])/g, '$1 $2')

// eslint-disable-next-line react/display-name
export const withLabel = (label: string) => (children: ReactNode) => {
  return (
    <div>
      <h4 style={{ marginTop: '15px', marginBottom: '10px' }}>
        {addSpacesBeforeCaps(label)}
      </h4>
      {children}
    </div>
  )
}
