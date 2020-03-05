const path = require('path');
const externals = require('webpack-node-externals');

const basePlugins = [
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-object-rest-spread'
];

const mode = process.env.NODE_ENV || 'production'

const baseConfig = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/env', {
                                targets: {
                                    browsers: [
                                        '>0.25%',
                                        'not dead'
                                    ]
                                }
                            }]
                        ],
                        plugins: basePlugins
                    }
                }
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        alias: {
            '@tronweb': path.resolve(__dirname, 'src/tronweb/src'),
        }
    },
    devtool: 'source-map',
    mode
};

nodePlugins = [
    ...basePlugins
]

if (mode === 'development') {
    nodePlugins.push('source-map-support')
}

module.exports = [
    {
        ...baseConfig,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'Sun.node.js',
            libraryTarget: 'commonjs2',
            libraryExport: 'default'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/env', {
                                    targets: {
                                        node: 6
                                    },
                                    forceAllTransforms: true
                                }]
                            ],
                            plugins: nodePlugins
                        }
                    }
                }
            ]
        },
        externals: [ externals() ],
        target: 'node'
    },
    {
        ...baseConfig,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'Sun.js',
            library: 'Sun',
            libraryTarget: 'umd',
            libraryExport: 'default',
            umdNamedDefine: true
        },
    }
];
