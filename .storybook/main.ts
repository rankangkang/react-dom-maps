import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['./**/*.mdx', './**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    // FIXME: storybook cannot resolve vite through static import,cause vite is esm
    const { mergeConfig } = await import('vite')
    const tailwindcss = (await import('@tailwindcss/vite')).default
    return mergeConfig(config, {
      build: {
        lib: false,
      },
      plugins: [tailwindcss()],
    })
  },
}
export default config
