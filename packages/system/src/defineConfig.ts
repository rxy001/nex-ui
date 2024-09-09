import type { SystemConfig } from './types'

export const defineConfig = <T extends SystemConfig>(config: T): T => config

defineConfig.colors = <T extends SystemConfig['colors']>(v: T): T => v
defineConfig.borders = <T extends SystemConfig['borders']>(v: T): T => v
defineConfig.lineHeights = <T extends SystemConfig['lineHeights']>(v: T): T => v
defineConfig.fontFamilies = <T extends SystemConfig['fontFamilies']>(v: T): T =>
  v
defineConfig.fontSizes = <T extends SystemConfig['fontSizes']>(v: T): T => v
defineConfig.fontWeights = <T extends SystemConfig['fontWeights']>(v: T): T => v
defineConfig.sizes = <T extends SystemConfig['sizes']>(v: T): T => v
defineConfig.spaceing = <T extends SystemConfig['spacing']>(v: T): T => v
// defineConfig.semantic = <T extends SemanticDefinition>(v: T): T => v
defineConfig.scales = <T extends SystemConfig['scales']>(v: T): T => v
defineConfig.aliases = <T extends SystemConfig['aliases']>(v: T): T => v
defineConfig.radii = <T extends SystemConfig['radii']>(v: T): T => v
defineConfig.breakpoints = <T extends SystemConfig['breakpoints']>(v: T): T => v
