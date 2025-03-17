import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'
import brandImage from '../public/react-dom-maps.png'

const _theme = create({
  base: 'light',
  brandTitle: 'React Dom Maps',
  brandUrl: 'https://github.com/rankangkang/react-dom-maps',
  brandImage: brandImage,
  colorPrimary: '#B5CF76',
  colorSecondary: '#4B9AFA',
})

addons.setConfig({
  theme: _theme,
  showPanel: false,
  initialActive: 'sidebar',
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: true },
    eject: { hidden: false },
    copy: { hidden: true },
    fullscreen: { hidden: true },
  },
})
