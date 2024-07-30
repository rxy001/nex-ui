import type { AliasDefinition } from './aliases'
import type { ScaleDefinition } from './scales'
import type {
  BordersDefinition,
  ColorsDefinition,
  LineHeightsDefinition,
  FontFamiliesDefinition,
  FontSizesDefinition,
  FontWeightsDefinition,
  SizesDefinition,
  SpacingDefinition,
  RadiiDefinition,
  // SemanticDefinition,
} from './tokens'
import type { SystemConfig } from './types'

export const defineConfig = <T extends SystemConfig>(config: T): T => config

defineConfig.colors = <T extends ColorsDefinition>(v: T): T => v
defineConfig.borders = <T extends BordersDefinition>(v: T): T => v
defineConfig.lineHeights = <T extends LineHeightsDefinition>(v: T): T => v
defineConfig.fontFamilies = <T extends FontFamiliesDefinition>(v: T): T => v
defineConfig.fontSizes = <T extends FontSizesDefinition>(v: T): T => v
defineConfig.fontWeights = <T extends FontWeightsDefinition>(v: T): T => v
defineConfig.sizes = <T extends SizesDefinition>(v: T): T => v
defineConfig.spaceing = <T extends SpacingDefinition>(v: T): T => v
// defineConfig.semanticTokens = (v: SemanticDefinition) => v
defineConfig.scales = <T extends ScaleDefinition>(v: T): T => v
defineConfig.aliases = <T extends AliasDefinition>(v: T): T => v
defineConfig.radii = <T extends RadiiDefinition>(v: T): T => v
