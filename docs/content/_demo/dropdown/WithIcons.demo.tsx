import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  Button,
} from '@nex-ui/react'
import {
  UserOutlined,
  SettingsOutlined,
  StarOutlined,
  ShareOutlined,
  ChevronRightOutlined,
} from '@nex-ui/icons'

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem startIcon={<UserOutlined />}>Profile</DropdownItem>
        <DropdownItem startIcon={<SettingsOutlined />}>Settings</DropdownItem>
        <DropdownItem startIcon={<StarOutlined />}>Stars</DropdownItem>
        <DropdownItem
          startIcon={<ShareOutlined />}
          endIcon={<ChevronRightOutlined />}
        >
          Share
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}
