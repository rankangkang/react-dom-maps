import { UseGoogleMapOptions } from "../../src";

/**
 * get api key from .env file
 * to do this, you need to create a `.env` file in the root of the project, and add the following line:
 * @example
 * # .env.local
 * VITE_GOOGLE_MAP_API_KEY=your_api_key
 */
export const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export const LAT_LNG_HK = {
  lat: 22.3193,
  lng: 114.1694,
};

export const defaultOptions: UseGoogleMapOptions = {
  loader: {
    // apiKey: GOOGLE_MAP_API_KEY,
    // @ts-expect-error
    apiKey: undefined,
  },
  map: {
    mapTypeId: "roadmap",
    center: LAT_LNG_HK,
    zoom: 12,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    disableDefaultUI: true,
  },
};
