# react-dom-maps

Simple Google Map render component for React, inspired by [`react-native-maps`](https://github.com/react-native-maps/react-native-maps?tab=readme-ov-file#component-api), so I name it after `react-dom-maps`.

## Quick start

```bash
npm i react-dom-maps

# or install through pnpm
pnpm add react-dom-maps
```

Then happy coding!

```tsx
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
```

## Docs

see 👉🏻 <https://rankangkang.github.io/react-dom-maps/>
