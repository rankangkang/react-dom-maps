import { useGoogleMap, GoogleMap } from "../../src";

import "./App.css";

function App() {
  const { api, ref } = useGoogleMap({
    apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  return (
    <GoogleMap
      className="h-[300px] w-[300px]"
      api={api}
      containerRef={ref}
    ></GoogleMap>
  );
}

export default App;
