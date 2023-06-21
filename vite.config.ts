/// <reference types="vitest" />

import { defineConfig, splitVendorChunkPlugin, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export const defaultPlugins = (mode): Array<Plugin | Array<Plugin>> => {
  const quasarVitePlugin = quasar({
    autoImportComponentCase: 'combined',
    sassVariables: 'src/css/quasar.variables.scss',
  }) as unknown as Plugin[];

  // remove "vite:quasar:script" Quasar Plugin in test mode
  /*
  if (mode === 'test') {
    quasarVitePlugin.splice(
      quasarVitePlugin.findIndex(({ name }) => name === 'vite:quasar:script'),
      1
    );
  }
  */

  const customPlugin = {
    name: 'custom-plugin',
    transform(code, source, opts) {
      if (!source.includes('ExtendedBadge.vue')) {
        return null;
      }

      console.log(code);
    },
  };

  return [
    vue({ template: { transformAssetUrls } }),
    customPlugin,
    quasarVitePlugin,
    customPlugin,
    splitVendorChunkPlugin(),
    tsconfigPaths(),
  ];
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const useProd = mode === 'production';

  const alias = [
    {
      // this is required for the SCSS modules
      find: /^~((?!@\/).+)$/,
      replacement: resolve(__dirname, 'node_modules/$1'),
    },
    {
      find: /^~@(.+)$/,
      replacement: resolve(__dirname, `src/$1`),
    },
  ];

  if (mode === 'test') {
    // alias.push({ find: /^quasar$/, replacement: 'quasar/dist/quasar.esm.js' });
  }

  const chunkMappings: Map<string, string | Array<string>> = new Map<
    string,
    string | Array<string>
  >([
    [
      'vue',
      [
        'vue',
        'pinia',
        'quasar',
        'vue-chartjs',
        'vue3-drr-grid-layout',
        'vue-json-csv',
        'vue-router',
      ],
    ],
    ['vendor', 'node_modules'], // node modules is always last in this case
  ]);

  return {
    // this still needs to be a mode check since dev/qa/production use the www prefix
    base: mode === 'development' ? '/' : '/www/',
    plugins: defaultPlugins(mode),
    test: {
      transformMode: {
        // ssr: [/\.([cm]?[jt]sx?|json|vue)$/],
        web: [/\.([jt]sx?|vue)$/],
      },
      environment: 'happy-dom',
      globals: true,
      coverage: {
        all: true,
        exclude: [
          '*.config.{ts,js}',
          '**/*.d.ts',
          'src/main.ts',
          'dist',
          'tests',
        ],
        functions: 40,
        branches: 60,
        statements: 60,
      },
      cache: {
        dir: resolve(__dirname, '.vitest_cache'),
      },
    },
    build: {
      sourcemap: useProd ? false : 'inline',
      rollupOptions: {
        output: {
          manualChunks(id) {
            for (const [k, v] of chunkMappings.entries()) {
              if (Array.isArray(v)) {
                for (const val of v) {
                  if (id.includes(val)) return k;
                }
              } else if (id.includes(v)) return k;
            }
          },
        },
      },
    },
    resolve: {
      alias,
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
        },
      },
    },
    assetsInclude: ['assets/*'],
    logLevel: 'info',
    server: {
      port: 8080,
    },
  };
});
