import { LatLng, PaneType } from '../../types'
import { createContainerDiv } from '../../utils/dom'

export interface OverlayClass extends google.maps.OverlayView {
  getElement(): HTMLDivElement

  /**
   * 更新位置，不传递 position 时，回到原点，并重新绘制
   * @param position
   */
  updatePosition(position?: LatLng): void
}

/**
 * create OverlayView factory class
 * @param maps
 * @returns
 */
export function createOverlayClass(maps: typeof google.maps = google.maps) {
  return class OverlayClass extends maps.OverlayView {
    readonly container: HTMLDivElement
    readonly pane: PaneType
    position?: LatLng

    constructor(config: { position?: LatLng; pane: PaneType }) {
      super()
      this.position = config.position
      this.pane = config.pane
      this.container = createContainerDiv({ classList: [this.pane] })
    }

    onAdd() {
      const panes = this.getPanes()
      if (this.container && panes) {
        this.container.style.position = 'absolute'
        panes[this.pane].appendChild(this.container)
      }
    }

    onRemove() {
      const container = this.container
      if (container && container.parentNode) {
        maps.event.clearInstanceListeners(container)
        container.parentNode.removeChild(container)
      }
    }

    draw() {
      const container = this.container
      if (container) {
        if (this.position) {
          const projection = this.getProjection()
          const positionPixel = projection.fromLatLngToDivPixel(new maps.LatLng(this.position))
          if (positionPixel) {
            container.style.left = `${positionPixel.x}px`
            container.style.top = `${positionPixel.y}px`
          }
        } else {
          container.style.left = '0px'
          container.style.top = '0px'
        }
      }
    }

    getElement() {
      return this.container
    }

    /**
     * 更新位置，不传递 position 时，回到原点，并重新绘制
     * @param position
     */
    updatePosition(position?: LatLng) {
      this.position = position
      this.draw()
    }
  }
}

let MemoOverlayClass: ReturnType<typeof createOverlayClass> | null = null

export function getOverlayClass(maps: typeof google.maps = google.maps) {
  if (!MemoOverlayClass) {
    MemoOverlayClass = createOverlayClass(maps)
  }
  return MemoOverlayClass
}
