import type { Preview } from '@storybook/react'
import './tailwind.css'
import { themes } from '@storybook/theming'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      options: {
        storySort: {
          method: '',
          order: ['Components', ['GoogleMap', 'Marker', 'Polyline', 'Polygon', 'Circle']],
          locales: '',
        },
      },
    },
    docs: {
      theme: themes.normal,
    },
  },
  tags: ['autodocs'],
}

export default preview
