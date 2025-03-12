export const getLatLngLiteral = <
  T extends {
    lat?: number | (() => number)
    lng?: number | (() => number)
    latitude?: number | (() => number)
    longitude?: number | (() => number)
  },
>(
  location?: T | null,
) => {
  const lat = location?.lat ?? location?.latitude ?? undefined
  const lng = location?.lng ?? location?.longitude ?? undefined
  return {
    lat: Number(typeof lat === 'function' ? lat() : lat),
    lng: Number(typeof lng === 'function' ? lng() : lng),
  }
}
