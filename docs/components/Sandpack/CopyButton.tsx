import { CopyIcon } from 'nextra/icons'
import { IconButton } from './IconButton'

export const CopyButton = () => {
  return (
    <IconButton title="Copy Code">
      <CopyIcon height={17} width={17} />
    </IconButton>
  )
}
