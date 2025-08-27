import type { TwConfig } from './tw-config';
import type {
  MatchVariants,
  AddedUtilities,
  CreatePlugin,
  PluginFunction,
} from './types';

const plugin: CreatePlugin = (handler) => {
  return { handler, config: undefined };
};

export default plugin;

export function getPluginFunctions(plugins: TwConfig['plugins']): {
  utilities: AddedUtilities;
  variants: MatchVariants;
} {
  return (
    plugins?.reduce<{ utilities: AddedUtilities; variants: MatchVariants }>(
      (acc, plugin) => {
        const { utilities, variants } = callPluginFunction(plugin.handler);
        return {
          utilities: { ...acc.utilities, ...utilities },
          variants: { ...acc.variants, ...variants },
        };
      },
      { utilities: {}, variants: {} },
    ) ?? { utilities: {}, variants: {} }
  );
}

function callPluginFunction(pluginFn: PluginFunction): {
  utilities: AddedUtilities;
  variants: MatchVariants;
} {
  let addedUtilities: AddedUtilities = {};
  let addedMatchVariants: MatchVariants = {};
  pluginFn({
    addUtilities: (utilities) => {
      addedUtilities = utilities;
    },
    matchVariant: (variants) => {
      addedMatchVariants = variants;
    },
    ...core,
  });
  return { utilities: addedUtilities, variants: addedMatchVariants };
}

function notImplemented(fn: string): never {
  throw new Error(
    `tailwindcss plugin function argument object prop "${fn}" not implemented`,
  );
}

const core = {
  addComponents: notImplemented,
  addBase: notImplemented,
  addVariant: notImplemented,
  e: notImplemented,
  prefix: notImplemented,
  theme: notImplemented,
  variants: notImplemented,
  config: notImplemented,
  corePlugins: notImplemented,
  matchUtilities: notImplemented,
  postcss: null,
};
