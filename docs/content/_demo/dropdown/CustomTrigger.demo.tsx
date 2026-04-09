import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  Box,
  Avatar,
  DropdownDivider,
} from '@nex-ui/react'
import {
  UserOutlined,
  SettingsOutlined,
  StarOutlined,
  CodeSquareOutlined,
  HeartOutlined,
} from '@nex-ui/icons'

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          radius='full'
          src='https://avatars.githubusercontent.com/u/25546323?v=4'
          alt='User menu'
        />
      </DropdownTrigger>
      <DropdownContent placement='bottom-start'>
        <Box
          sx={{
            px: '2',
            py: '1',
            fs: 'sm',
          }}
        >
          Signed in as <strong>@x1ngYu</strong>
        </Box>
        <DropdownDivider />
        <DropdownItem startIcon={<UserOutlined />}>Profile</DropdownItem>
        <DropdownItem startIcon={<StarOutlined />}>Stars</DropdownItem>
        <DropdownItem startIcon={<CodeSquareOutlined />}>Gists</DropdownItem>
        <DropdownItem startIcon={<HeartOutlined />}>Sponsors</DropdownItem>
        <DropdownItem startIcon={<SettingsOutlined />}>Settings</DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}
