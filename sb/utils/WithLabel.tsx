import type { ReactNode } from 'react'

const addSpacesBeforeCaps = (label: string) =>
  label.replace(/([a-z0-9])([A-Z])/g, '$1 $2')

interface WithLabelProps {
  label: string
  children: ReactNode
}
export const WithLabel = ({ label, children }: WithLabelProps) => {
  return (
    <div>
      <h4 style={{ marginTop: 15, marginBottom: 10 }}>
        {addSpacesBeforeCaps(label)}
      </h4>
      {children}
    </div>
  )
}

WithLabel.displayName = 'WithLabel'
