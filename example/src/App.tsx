import { useGoogleMap, GoogleMap, createMarker } from "../../src";

import "./App.css";

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

export default App;
