# google-map-for-react

Simple Google Map render component for React, inspired by `react-native-maps`.

## Usage

```tsx
import { useGoogleMap, GoogleMap, createMarker } from "../../src";

const Marker = createMarker(() => {
  return (
    <div className="w-[20px] h-[20px] bg-red-500 rounded-full border-white border" />
  );
});

const LAT_LNG_HK = {
  lat: 22.3193,
  lng: 114.1694,
};

function App() {
  const { api, ref } = useGoogleMap({
    /** ✨ replace it with your own api key */
    apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    mapTypeId: "roadmap",
    center: LAT_LNG_HK,
  });

  return (
    <GoogleMap
      className="w-full h-[600px] relative"
      api={api}
      containerRef={ref}
    >
      <Marker {...LAT_LNG_HK} origin="bottomCenter" />
    </GoogleMap>
  );
}
```

> get a api key: <https://www.runoob.com/googleapi/google-maps-api-key.html>

## TODO

- [x] support `<Control />` component
- [x] support `<Polyline />` component
- [ ] support `<Polygon />` component
- [ ] support `<Circle />` component

`react-native-maps` api reference：<https://github.com/react-native-maps/react-native-maps?tab=readme-ov-file#component-api>
