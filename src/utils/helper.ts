import { MapsEvent } from '../types'

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

export const attachEvent = <T extends google.maps.MVCObject>(
  instance: T,
  eventName: MapsEvent,
  handler: Function,
) => {
  return google.maps.event.addListener(instance, eventName, handler)
}

export const attachEvents = <T extends google.maps.MVCObject>(
  instance: T,
  eventMap: Partial<Record<MapsEvent, Function | null | undefined>>,
) => {
  const listeners = []
  for (const name in eventMap) {
    const eventName = name as MapsEvent
    const eventHandler = eventMap[eventName]
    if (eventHandler) {
      listeners.push(attachEvent(instance, eventName, eventHandler))
    }
  }

  return listeners
}

export const detachEvents = (listeners: google.maps.MapsEventListener[]) => {
  listeners.forEach((l) => {
    google.maps.event.removeListener(l)
  })
}
