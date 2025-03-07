import meta from './docs/components/_meta'

export default {
  index: {
    type: 'page',
    title: '首页',
    display: 'hidden',
    theme: {
      layout: 'full',
      toc: false,
      timestamp: false,
    },
  },
  docs: {
    type: 'page',
    title: '文档',
  },
  components: {
    type: 'page',
    href: `/docs/components/${Object.keys(meta).sort().shift()}`,
    title: '组件',
  },
  theming: {
    type: 'page',
    href: '/docs/customization/theming',
    title: '定制',
  },
}
