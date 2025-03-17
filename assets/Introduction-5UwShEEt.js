import{j as e,e as o}from"./index-QlSisDSG.js";import{useMDXComponents as r}from"./index-CIay_dDh.js";import"./preview-CRP_v-wa.js";import"./DocsRenderer-CFRXHY34-CiYmJu-U.js";import"./iframe-e6kKNdsN.js";import"./index-CintVSxK.js";import"./index-BMBcyzG5.js";import"./index-CqdiiMci.js";import"./index-Cf3yyvpF.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";import"./react-18-xMj-Mug-.js";const{definePreview:h}=__STORYBOOK_MODULE_PREVIEW_API__,i=`# react-dom-maps

A React library for integrating Google Maps with customizable components and markers, inspired by [\`react-native-maps\`](https://github.com/react-native-maps/react-native-maps?tab=readme-ov-file#component-api). The library is named \`react-dom-maps\` to reflect its focus on web-based map rendering.

## 🚀 Quick Start

Install the package using your preferred package manager:

\`\`\`bash
npm install react-dom-maps

# or install using pnpm
pnpm add react-dom-maps
\`\`\`

Start building your React-based Google Maps application!

\`\`\`tsx
import { useGoogleMap, GoogleMap, createMarker } from 'react-dom-maps'

const Marker = createMarker(() => {
  return <div className="w-[20px] h-[20px] bg-red-500 rounded-full border-white border" />
})

const LAT_LNG_HK = {
  lat: 22.3193,
  lng: 114.1694,
}

function App() {
  const options = useMemo(
    () => ({
      loader: {
        /** ✨ Replace this with your own API key */
        apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
      },
      map: {
        mapTypeId: 'roadmap',
        center: LAT_LNG_HK,
      },
    }),
    [],
  )

  const { api, ref } = useGoogleMap(options)

  return (
    <GoogleMap className="w-full h-[600px] relative" api={api} containerRef={ref}>
      <Marker {...LAT_LNG_HK} origin="bottomCenter" />
    </GoogleMap>
  )
}
\`\`\`

## 📚 Documentation

For detailed documentation, visit 👉🏻 [react-dom-maps Docs](https://rankangkang.github.io/react-dom-maps/)
`;function a(n){return e.jsx(o,{children:i})}function k(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(a,{...n})}):a()}export{k as default};
