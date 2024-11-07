import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";

export function load(options: LoaderOptions) {
  return new Loader(options).load();
}
