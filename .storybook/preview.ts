import type { Preview } from '@storybook/react'
import './tailwind.css'

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
  },
  tags: ['autodocs'],
}

export default preview
