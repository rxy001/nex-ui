import {
  Drawer,
  DrawerTrigger,
  Button,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Flex,
} from '@nex-ui/react'

export default function App() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const

  return (
    <Flex gap='5' wrap='wrap'>
      {sizes.map((size) => (
        <Drawer key={size}>
          <DrawerTrigger>
            <Button>Open {size}</Button>
          </DrawerTrigger>
          <DrawerContent size={size}>
            <DrawerHeader>Drawer Header</DrawerHeader>
            <DrawerBody>
              <Flex direction='column' gap='5'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </Flex>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose>
                <Button color='red' variant='text'>
                  Cancel
                </Button>
              </DrawerClose>
              <DrawerClose>
                <Button>Action</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </Flex>
  )
}
