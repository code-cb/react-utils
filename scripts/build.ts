import { basename, dirname } from 'path';
import { defineConfig } from 'rollup';
import cleanup from 'rollup-plugin-cleanup';
import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pkg from '../package.json';

const tsconfig = './tsconfig.json';

export default [
  defineConfig({
    input: pkg.source,
    external: ['react', 'react/jsx-runtime'],
    output: [
      {
        dir: dirname(pkg.module),
        entryFileNames: basename(pkg.module),
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ tsconfig }), resolve(), cleanup(), filesize()],
    watch: { include: 'src/**' },
  }),
];
