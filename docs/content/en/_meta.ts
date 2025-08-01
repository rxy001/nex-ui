import meta from './docs/components/_meta'

export default {
  index: {
    type: 'page',
    title: 'Home',
    display: 'hidden',
    theme: {
      layout: 'full',
      toc: false,
      timestamp: false,
    },
  },
  docs: {
    type: 'page',
    title: 'Documentation',
  },
  components: {
    type: 'page',
    href: `/docs/components/${Object.keys(meta).sort().shift()}`,
    title: 'Components',
  },
  theming: {
    type: 'page',
    href: '/docs/customization/theming',
    title: 'Customization',
  },
}
