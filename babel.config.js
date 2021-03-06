'use strict';

module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: { node: '4.8.0' },
            useBuiltIns: 'entry',
            corejs: 3
        }]
    ],
    plugins: [
        '@babel/plugin-transform-runtime'
    ],
    ignore: [
        // Add safelisted modules to sped up builds
        '**/ajv/**',
        '**/lodash/**',
        '**/mustache/**',
        '**/mkdirp/**',
        '**/core-js/**',
        '**/bin/**'
    ]
};
