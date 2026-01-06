// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs-vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: { name: '@storybook/nextjs-vite', options: {} },
  staticDirs: ['../public'],

  viteFinal: async (viteConfig) => {
    viteConfig.resolve ??= {};

    // @/xxx -> (프로젝트 루트)/xxx  ← components 폴더가 루트에 있다고 했으니 ../ 가 맞음
    const atToRoot = { find: /^@\//, replacement: resolve(__dirname, '../') + '/' };

    const alias = viteConfig.resolve.alias;

    if (Array.isArray(alias)) {
      alias.push(atToRoot);
    } else if (alias && typeof alias === 'object') {
      viteConfig.resolve.alias = [
        ...Object.entries(alias).map(([find, replacement]) => ({
          find,
          replacement: String(replacement),
        })),
        atToRoot,
      ];
    } else {
      viteConfig.resolve.alias = [atToRoot];
    }

    return viteConfig;
  },
};

export default config;
