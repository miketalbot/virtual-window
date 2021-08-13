import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel'
import pkg from './package.json';
import postcss from "rollup-plugin-postcss";
import * as react from 'react';
import * as reactDom from 'react-dom';

export default [
  // browser-friendly UMD build
  {
    input: 'VirtualWindow.js',
    output: {
      name: 'ReactVirtualWindow',
      file: pkg.browser,
      format: 'umd'
    },
    external: ['react'],
    plugins: [
      postcss({
        extract: false,
        modules: true,
        use: ['sass'],
      }),
      babel({
        exclude: "node_modules/**",
        presets: ['@babel/env', '@babel/preset-react']
      }),
      resolve(),
      commonjs({
        exclude: "node_modules/**",
        namedExports: {
          react: Object.keys(react),
          'react-dom': Object.keys(reactDom)
        },
      })
    ]
  },
  {
    input: 'VirtualWindow.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    external: ['react'],
    plugins: [
      postcss({
        extract: false,
        modules: true,
        use: ['sass'],
      }),
      babel({
        exclude: "node_modules/**",
        presets: ['@babel/env', '@babel/preset-react']
      }),
      resolve(),
      commonjs({
        exclude: "node_modules/**",
        namedExports: {
          react: Object.keys(react),
          'react-dom': Object.keys(reactDom)
        },
      })
    ]
  }
];
