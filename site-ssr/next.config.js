const packageJsonDeps = require('./package.json').dependencies;
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { NodeModuleFederation } = require('@telenko/node-mf');

module.exports = {
    future: { webpack5: true },
    webpack: (config, options) => {
        const { buildId, dev, isServer, defaultLoaders, webpack, dependencies } = options;
        const mfConf = {
            remotes: {
                design_system_1_0_0: isServer
                    ? "design_system_1_0_0@http://localhost:3002/node/remoteEntry.js"
                    : {
                        external: `external new Promise((r, j) => {
                            window['design_system_1_0_0'].init({
                                react: {
                                    "${packageJsonDeps.react}": {
                                        get: () => Promise.resolve().then(() => () => globalThis.React),
                                    }
                                }
                            });

                            r({
                                get: (request) => window['design_system_1_0_0'].get(request),
                                init: (args) => {}
                            });
                        })
                    `,
                    },
            },
            shared: {
                ...dependencies,
                react: {
                    eager: true,
                    requiredVersion: packageJsonDeps.react,
                    singleton: true,
                },
                'react-dom': {
                    eager: true,
                    requiredVersion: packageJsonDeps['react-dom'],
                    singleton: true,
                },
                'styled-components': {
                    eager: true,
                    singleton: true,
                    requiredVersion: packageJsonDeps['styled-components']
                }
            },
        };
        return {
            ...config,
            plugins: [
                ...config.plugins,
                new (isServer ? NodeModuleFederation : ModuleFederationPlugin)(mfConf),
            ],
            experiments: { topLevelAwait: true },
        };
    },

    webpackDevMiddleware: (config) => {
        // Perform customizations to webpack dev middleware config
        // Important: return the modified config
        return config;
    },
};