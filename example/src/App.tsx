import { useState } from "react";
import { useGoogleMap, GoogleMap, Polyline } from "../../src";
import { BottomCenterControl } from "./components/Control";
import { Marker } from "./components/Marker";
import { defaultOptions } from "./config";

// // 生成一系列香港地点的经纬度，不要相同
const latLngAroundHK = [
  { lat: 22.3193, lng: 114.1694 },
  { lat: 22.3027, lng: 114.1772 },
  { lat: 22.2855, lng: 114.1577 },
  { lat: 22.3364, lng: 114.1747 },
  { lat: 22.2783, lng: 114.1747 },
  { lat: 22.3072, lng: 114.2551 },
  { lat: 22.3964, lng: 114.1095 },
  { lat: 22.3193, lng: 114.2115 },
  { lat: 22.3701, lng: 114.1142 },
  { lat: 22.3193, lng: 114.1694 },
];

const polylineOptions = {
  strokeColor: "#0000ce",
  strokeOpacity: 0.5,
}

function App() {
  const { api, ref } = useGoogleMap(defaultOptions);
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <div className="w-full h-full">
      <GoogleMap
        className="w-full h-full relative"
        api={api}
        containerRef={ref}
      >
        <BottomCenterControl
          onZoomIn={() => {
            if (api?.map) {
              api.map.setZoom(api.map.getZoom()! + 1);
            }
          }}
          onZoomOut={() => {
            if (api?.map) {
              api.map.setZoom(api.map.getZoom()! - 1);
            }
          }}
          onBackCenter={() => {
            if (api?.map) {
              const bounds = new api.maps.LatLngBounds();
              latLngAroundHK.forEach((latLng) => {
                bounds.extend(latLng);
              });
              api.map.fitBounds(bounds);
            }
          }}
          onToggleRoute={() => {
            setVisible((v) => !v);
          }}
        />
        {latLngAroundHK.map((latLng, idx) => (
          <Marker {...latLng} key={idx} origin="bottomCenter" originOffset={[0, 6]} />
        ))}
        <Polyline path={latLngAroundHK} visible={visible} options={polylineOptions} />
      </GoogleMap>
    </div>
  );
}

export default App;
