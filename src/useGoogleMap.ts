import { useEffect, useRef, useState } from "react";

import { load } from "./utils/loader";
import { GoogleMapApi } from "./types";
import { LoaderOptions } from "@googlemaps/js-api-loader";

export type GoogleMapStat = "loading" | "loaded" | "error";

export type UseGoogleMapOptions = {
  /** loader option, include apiKey, you should keep the ref stable */
  loader: LoaderOptions;
  /** map initial option, you should keep the ref stable */
  map?: google.maps.MapOptions;
};

/**
 * 
 * @param options 
 * @returns 
 */
export function useGoogleMap(options: UseGoogleMapOptions) {
  const { loader: loaderOption, map: mapOptions } = options;
  const [api, setApi] = useState<GoogleMapApi>();
  const [stat, setStat] = useState<GoogleMapStat>();
  const [err, setErr] = useState<any>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStat("loading");
    load(loaderOption)
      .then((google) => {
        if (ref.current) {
          const map = new google.maps.Map(ref.current, {
            ...mapOptions,
          });
          setApi({ map, maps: google.maps });
          setStat("loaded");
        } else {
          throw new Error("mapDiv is required");
        }
      })
      .catch((e) => {
        setStat("error");
        setErr(e);
      });
  }, [loaderOption]);

  // update map options
  useEffect(() => {
    if (api?.map && mapOptions) {
      api.map.setOptions(mapOptions);
    }
  }, [api, mapOptions]);

  return { api, ref, stat, err };
}
