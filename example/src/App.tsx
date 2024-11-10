import { useGoogleMap, GoogleMap } from "../../src";

import "./App.css";

function App() {
  const { api, ref } = useGoogleMap({
    apiKey: "AIzaSyBas7qaE8DCC9lPtDlTrozayroywgpJlls",
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
