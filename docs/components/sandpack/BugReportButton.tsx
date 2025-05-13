import { useEvent } from '@nex-ui/hooks'
import { BugOutlined } from '@nex-ui/icons'
import { IconButton } from './IconButton'

export const BugReportButton = () => {
  const handlePress = useEvent(() => {
    window.open('https://github.com/rxy001/nex-ui/issues', '_blank')
  })

  return (
    <IconButton
      aria-label='Report Button'
      title='Report a bug'
      onClick={handlePress}
    >
      <BugOutlined height={18} width={18} />
    </IconButton>
  )
}
