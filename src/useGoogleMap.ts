import { useEffect, useRef, useState } from "react";

import { load } from "./GoogleMap.loader";
import { GoogleMapApi } from "./GoogleMap.types";

export function useGoogleMap(
  options: google.maps.MapOptions & { apiKey?: string } = {},
) {
  const { apiKey, ...mapOptions } = options;
  const [api, setApi] = useState<GoogleMapApi>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!apiKey) {
      return console.error("Invalid apiKey");
    }

    load({ apiKey }).then((google) => {
      if (ref.current) {
        const map = new google.maps.Map(ref.current!, {
          ...mapOptions,
        });
        setApi({ map, maps: google.maps });
      }
    });
  }, [apiKey, ref.current]);

  return { api, ref };
}
