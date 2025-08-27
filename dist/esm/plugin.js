const plugin = (handler) => {
    return { handler, config: undefined };
};
export default plugin;
export function getPluginFunctions(plugins) {
    var _a;
    return ((_a = plugins === null || plugins === void 0 ? void 0 : plugins.reduce((acc, plugin) => {
        const { utilities, variants } = callPluginFunction(plugin.handler);
        return {
            utilities: { ...acc.utilities, ...utilities },
            variants: { ...acc.variants, ...variants },
        };
    }, { utilities: {}, variants: {} })) !== null && _a !== void 0 ? _a : { utilities: {}, variants: {} });
}
function callPluginFunction(pluginFn) {
    let addedUtilities = {};
    let addedMatchVariants = {};
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
function notImplemented(fn) {
    throw new Error(`tailwindcss plugin function argument object prop "${fn}" not implemented`);
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
