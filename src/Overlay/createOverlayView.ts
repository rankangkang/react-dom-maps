import { LatLng, PaneType } from "../GoogleMap.types";

/**
 * create OverlayView factory class
 * @param maps
 * @returns
 */
export function createOverlayView(maps: typeof google.maps = google.maps) {
  return class OverlayView extends maps.OverlayView {
    readonly container: HTMLDivElement;
    readonly position?: LatLng;
    readonly pane: PaneType;

    constructor(config: {
      container: HTMLDivElement;
      position?: LatLng;
      pane: PaneType;
    }) {
      super();
      this.container = config.container;
      this.position = config.position;
      this.pane = config.pane;
    }

    onAdd() {
      const panes = this.getPanes();
      if (this.container && panes) {
        this.container.style.position = "absolute";
        panes[this.pane].appendChild(this.container);
      }
    }

    onRemove() {
      const container = this.container;
      if (container && container.parentNode) {
        maps.event.clearInstanceListeners(container);
        container.parentNode.removeChild(container);
      }
    }

    draw() {
      const container = this.container;
      if (container) {
        if (this.position) {
          const projection = this.getProjection();
          const positionPixel = projection.fromLatLngToDivPixel(
            new maps.LatLng(this.position),
          );
          if (positionPixel) {
            container.style.left = `${positionPixel.x}px`;
            container.style.top = `${positionPixel.y}px`;
          }
        } else {
          container.style.left = "0px";
          container.style.top = "0px";
        }
      }
    }
  };
}
