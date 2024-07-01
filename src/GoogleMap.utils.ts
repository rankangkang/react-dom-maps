type ClassValue = string | undefined | null | boolean | { [key: string]: any };

/**
 * Combines multiple class names into a single string.
 *
 * @param args - Class names, objects, or arrays of class names.
 * @returns A single string with all valid class names.
 */
export function cn(...args: ClassValue[]): string {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (!arg) return;

    if (typeof arg === "string") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(cn(...arg));
    } else if (typeof arg === "object") {
      for (const key in arg) {
        if (arg[key]) {
          classes.push(key);
        }
      }
    }
  });

  return classes.join(" ");
}

export const noop = () => {
  // @ts-nocheck
};

export const getLatLngLiteral = (
  location: google.maps.LatLng | google.maps.LatLngLiteral,
) => {
  const lat = location?.lat || undefined;
  const lng = location?.lng || undefined;
  return {
    lat: Number(typeof lat === "function" ? lat() : lat),
    lng: Number(typeof lng === "function" ? lng() : lng),
  };
};
