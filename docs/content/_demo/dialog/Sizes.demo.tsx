import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogClose,
  Flex,
} from '@nex-ui/react'

export default function App() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const

  return (
    <Flex gap='5' wrap='wrap'>
      {sizes.map((size) => (
        <Dialog key={size}>
          <DialogTrigger>
            <Button>Open {size}</Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>Dialog Header</DialogHeader>
            <DialogBody>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit
                amet hendrerit risus, sed porttitor quam.
              </p>
              <p>
                Magna exercitation reprehenderit magna aute tempor cupidatat
                consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
                consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
                et. Culpa deserunt nostrud ad veniam.
              </p>
            </DialogBody>
            <DialogFooter>
              <DialogClose>
                <Button color='red' variant='text'>
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose>
                <Button>Action</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </Flex>
  )
}
