import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  Button,
} from '@nex-ui/react'

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem
          as='a'
          href='https://www.google.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Google
        </DropdownItem>
        <DropdownItem
          as='a'
          href='https://www.facebook.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Facebook
        </DropdownItem>
        <DropdownItem
          as='a'
          href='https://www.twitter.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Twitter
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}
