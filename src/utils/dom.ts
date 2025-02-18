import { PaneType } from "../types";

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

export const getLatLngLiteral = (
  location?: google.maps.LatLng | google.maps.LatLngLiteral | null,
) => {
  const lat = location?.lat || undefined;
  const lng = location?.lng || undefined;
  return {
    lat: Number(typeof lat === "function" ? lat() : lat),
    lng: Number(typeof lng === "function" ? lng() : lng),
  };
};

export function createContainerDiv(
  options: { pane?: PaneType; className?: string } = {},
) {
  const { pane, className } = options;
  const div = document.createElement("div");
  div.style.position = "absolute";
  if (className) {
    div.classList.add(className);
  }
  if (pane) {
    div.classList.add(pane);
  }
  return div;
}
