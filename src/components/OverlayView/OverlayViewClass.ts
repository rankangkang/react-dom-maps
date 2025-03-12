import { LatLng, PaneType } from '../../types'
import { createContainerDiv } from '../../utils/dom'
import { getLatLngLiteral } from '../../utils/helper'

import { OverlayViewDraggable, OverlayViewOrigin, OverlayViewOriginOffset } from './types'

export type CreateOverlayViewOptions = {
  draggable?: OverlayViewDraggable
  pane?: PaneType
  position?: LatLng
  origin?: OverlayViewOrigin
  originOffset?: OverlayViewOriginOffset
}

export interface OverlayViewClass extends google.maps.OverlayView {
  getElement(): HTMLDivElement

  /**
   * 更新位置，不传递 position 时，回到原点，并重新绘制
   * @param position
   */
  setOptions(options: CreateOverlayViewOptions): void
}

/**
 * create OverlayView factory class
 * @param maps
 * @returns
 */
export function createOverlayViewClass(maps: typeof google.maps = google.maps) {
  return class extends maps.OverlayView implements OverlayViewClass {
    readonly container: HTMLDivElement
    #pane: PaneType
    #draggable: OverlayViewDraggable & {
      // 上一事件触发位置，单位是像素
      prevPxPos: { x: number; y: number } | null
    }

    #origin: OverlayViewOrigin
    #originOffset: OverlayViewOriginOffset
    #position?: LatLng
    // 是否已被移除
    #isRemoved = false

    constructor(option: CreateOverlayViewOptions = {}) {
      super()
      this.#position = option.position
      this.#pane = option.pane ?? 'overlayMouseTarget'
      this.#origin = option.origin ?? 'center'
      this.#originOffset = option.originOffset ?? [0, 0]
      this.container = createContainerDiv({ classList: [this.#pane] })

      this.#draggable = Object.assign({}, option.draggable, { prevPxPos: null })
    }

    get wrappedPosition() {
      if (!this.#position) {
        // 从像素 0px, 0px 计算坐标，屏幕中央
        return getLatLngLiteral(this.getProjection().fromDivPixelToLatLng(new maps.Point(0, 0)))
      }
      return this.#position
    }

    get mapDiv(): HTMLElement | undefined {
      return (this.getMap() as google.maps.Map)?.getDiv()
    }

    getElement() {
      return this.container
    }

    /**
     * 更新位置
     * @param position
     */
    setOptions(options: CreateOverlayViewOptions) {
      this.onRemove()
      if (options.position) {
        this.#position = options.position
      }
      if (options.origin) {
        this.#origin = options.origin
      }
      if (options.originOffset) {
        this.#originOffset = options.originOffset
      }
      if (options.draggable) {
        this.#draggable = Object.assign(this.#draggable, options.draggable)
      }
      if (options.pane) {
        this.#pane = options.pane
      }
      this.onAdd()
      this.draw()
    }

    setMapDraggable(draggable: boolean) {
      this.getMap()?.set('draggable', draggable)
    }

    draw() {
      const projection = this.getProjection()
      if (!projection) {
        return
      }
      const point = projection.fromLatLngToDivPixel(this.wrappedPosition)
      if (!point) {
        return
      }

      const [ox, oy] = this.#originOffset
      const offsetX = this.container.offsetWidth
      const offsetY = this.container.offsetHeight
      if (this.#origin === 'bottomCenter') {
        this.container.style.transform = `translate(${point.x - offsetX / 2 + ox}px, ${point.y - offsetY + oy}px)`
      } else {
        // default center
        this.container.style.transform = `translate(${point.x - offsetX / 2 + ox}px, ${point.y - offsetY / 2 + oy}px)`
      }
    }

    onAdd() {
      this.#isRemoved = false
      // add container to map
      const panes = this.getPanes()
      if (this.container && panes) {
        this.container.style.position = 'absolute'
        panes[this.#pane].appendChild(this.container)
      }

      if (this.#draggable.draggable) {
        this.mapDiv?.addEventListener('mouseleave', this.triggerMouseUp)
        this.container.addEventListener('mousedown', this.onMouseDown)
        this.container.addEventListener('mouseup', this.onMouseUp)
      }
    }

    onRemove() {
      // 恢复 map 拖拽
      this.setMapDraggable(true)
      this.#isRemoved = true
      if (this.#draggable.draggable) {
        try {
          // NOTE: remove 时，this._div() 返回值为 null
          this.mapDiv?.removeEventListener('mouseleave', this.triggerMouseUp)
          this.container.removeEventListener('mousedown', this.onMouseDown)
          this.container.removeEventListener('mouseup', this.onMouseUp)
        } catch (e) {}
      }

      // remove container from map
      const container = this.container
      if (container && container.parentNode) {
        maps.event.clearInstanceListeners(container)
        container.parentNode.removeChild(container)
      }
    }

    triggerMouseUp = () => {
      maps.event.trigger(this.container, 'mouseup')
    }

    onMouseDown = (e: MouseEvent) => {
      if (this.#isRemoved) {
        return
      }
      // 鼠标按下，marker 处于拖拽状态，通过鼠标移动的位移反向计算移动后的经纬度
      this.container.style.cursor = 'grabbing'
      this.setMapDraggable(false)
      this.#draggable.prevPxPos = { x: e.clientX, y: e.clientY }
      this.#draggable?.onDragStart?.(e, { latlng: getLatLngLiteral(this.wrappedPosition) })
      this.mapDiv?.addEventListener('mousemove', (e: MouseEvent) => {
        if (!this.#draggable.prevPxPos) {
          return
        }
        const currPxPos = this.getProjection()?.fromLatLngToDivPixel(this.wrappedPosition)
        if (!currPxPos) {
          return
        }
        const dx = this.#draggable.prevPxPos.x - e.clientX
        const dy = this.#draggable.prevPxPos.y - e.clientY
        const nextPixel = new maps.Point(currPxPos.x - dx, currPxPos.y - dy)
        const nextPosition = this.getProjection().fromDivPixelToLatLng(nextPixel)!
        this.#position = getLatLngLiteral(nextPosition)
        this.#draggable.prevPxPos = { x: e.clientX, y: e.clientY }
        this.draw()
        this.#draggable?.onDrag?.(e, { latlng: getLatLngLiteral(nextPosition) })
      })
    }

    onMouseUp = (e: MouseEvent) => {
      if (this.#isRemoved) {
        return
      }
      // 恢复 map 拖拽
      this.setMapDraggable(true)
      this.container.style.cursor = 'default'
      this.#position = this.wrappedPosition
      this.#draggable.prevPxPos = null
      this.draw()
      this.#draggable?.onDragEnd?.(e, { latlng: getLatLngLiteral(this.wrappedPosition) })
    }
  }
}

let MemoOverlayClass: ReturnType<typeof createOverlayViewClass> | null = null

export function getOverlayViewClass(maps: typeof google.maps = google.maps) {
  if (!MemoOverlayClass) {
    MemoOverlayClass = createOverlayViewClass(maps)
  }
  return MemoOverlayClass
}
