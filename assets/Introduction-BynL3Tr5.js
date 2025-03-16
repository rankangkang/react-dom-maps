import{j as n,T as r,e as a}from"./index-CATU0vjC.js";import{useMDXComponents as p}from"./index-CIay_dDh.js";import"./preview-BOKLmSPk.js";import"./DocsRenderer-CFRXHY34-b4gF5q8g.js";import"./iframe-Vkcw8iQM.js";import"./index-CintVSxK.js";import"./index-CqdiiMci.js";import"./index-Cf3yyvpF.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";import"./react-18-xMj-Mug-.js";const{definePreview:x}=__STORYBOOK_MODULE_PREVIEW_API__,i=`# react-dom-maps

Simple Google Map render component for React, inspired by [\`react-native-maps\`](https://github.com/react-native-maps/react-native-maps?tab=readme-ov-file#component-api), so I name it after \`react-dom-maps\`.

## Quick start

\`\`\`bash
npm i react-dom-maps

# or install through pnpm
pnpm add react-dom-maps
\`\`\`

Then happy coding!

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
  const options = useMemo(() => {
    return {
      loader: {
        /** ✨ replace it with your own api key */
        apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
      },
      map: {
        mapTypeId: 'roadmap',
        center: LAT_LNG_HK,
      },
    }
  }, [])

  const { api, ref } = useGoogleMap(options)

  return (
    <GoogleMap className="w-full h-[600px] relative" api={api} containerRef={ref}>
      <Marker {...LAT_LNG_HK} origin="bottomCenter" />
    </GoogleMap>
  )
}
\`\`\`

## Docs

see 👉🏻 <https://rankangkang.github.io/react-dom-maps/>
`;function o(e){return n.jsxs(n.Fragment,{children:[n.jsx(r,{children:"Introduction"}),`
`,n.jsx(a,{children:i})]})}function G(e={}){const{wrapper:t}={...p(),...e.components};return t?n.jsx(t,{...e,children:n.jsx(o,{...e})}):o()}export{G as default};
