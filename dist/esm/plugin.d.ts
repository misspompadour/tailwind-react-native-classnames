import type { TwConfig } from './tw-config';
import type { MatchVariants, AddedUtilities, CreatePlugin } from './types';
declare const plugin: CreatePlugin;
export default plugin;
export declare function getPluginFunctions(plugins: TwConfig['plugins']): {
    utilities: AddedUtilities;
    variants: MatchVariants;
};
