import Image from 'next/image'
import { NexProvider } from '@nex-ui/react'

export default {
  logo: <Image src="/logo.svg" width={140} height={90} />,
  project: {
    link: 'https://github.com/rxy001/nex-ui',
  },
  navigation: {
    prev: false,
    next: false,
  },
  footer: {
    component: null,
  },
  toc: {
    backToTop: true,
    title: 'CONTENTS',
    float: true,
  },
  editLink: {
    component: null,
  },
  feedback: {
    content: null,
  },
  i18n: [
    { locale: 'zh', text: '中文' },
    { locale: 'en', text: 'English' },
  ],
  main: ({ children }) => {
    return <NexProvider>{children}</NexProvider>
  },
}
