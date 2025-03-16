// 控制器位置枚举，用于外部声明
export enum ControlPosition {
  TOP_LEFT = 'TOP_LEFT',
  TOP_CENTER = 'TOP_CENTER',
  TOP_RIGHT = 'TOP_RIGHT',
  LEFT_TOP = 'LEFT_TOP',
  LEFT_CENTER = 'LEFT_CENTER',
  LEFT_BOTTOM = 'LEFT_BOTTOM',
  RIGHT_TOP = 'RIGHT_TOP',
  RIGHT_CENTER = 'RIGHT_CENTER',
  RIGHT_BOTTOM = 'RIGHT_BOTTOM',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  BOTTOM_CENTER = 'BOTTOM_CENTER',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  INLINE_START_BLOCK_START = 'INLINE_START_BLOCK_START',
  INLINE_START_BLOCK_CENTER = 'INLINE_START_BLOCK_CENTER',
  INLINE_START_BLOCK_END = 'INLINE_START_BLOCK_END',
  INLINE_END_BLOCK_START = 'INLINE_END_BLOCK_START',
  INLINE_END_BLOCK_CENTER = 'INLINE_END_BLOCK_CENTER',
  INLINE_END_BLOCK_END = 'INLINE_END_BLOCK_END',
  BLOCK_START_INLINE_START = 'BLOCK_START_INLINE_START',
  BLOCK_START_INLINE_CENTER = 'BLOCK_START_INLINE_CENTER',
  BLOCK_START_INLINE_END = 'BLOCK_START_INLINE_END',
  BLOCK_END_INLINE_START = 'BLOCK_END_INLINE_START',
  BLOCK_END_INLINE_CENTER = 'BLOCK_END_INLINE_CENTER',
  BLOCK_END_INLINE_END = 'BLOCK_END_INLINE_END',
}

// 控制器位置映射表，用于将枚举值映射到 Google Maps ControlPosition
export const ControlPositionMap: Record<
  ControlPosition,
  (maps: typeof google.maps) => google.maps.ControlPosition
> = {
  [ControlPosition.TOP_LEFT]: (maps) => maps.ControlPosition.TOP_LEFT,
  [ControlPosition.TOP_CENTER]: (maps) => maps.ControlPosition.TOP_CENTER,
  [ControlPosition.TOP_RIGHT]: (maps) => maps.ControlPosition.TOP_RIGHT,
  [ControlPosition.LEFT_TOP]: (maps) => maps.ControlPosition.LEFT_TOP,
  [ControlPosition.LEFT_CENTER]: (maps) => maps.ControlPosition.LEFT_CENTER,
  [ControlPosition.LEFT_BOTTOM]: (maps) => maps.ControlPosition.LEFT_BOTTOM,
  [ControlPosition.RIGHT_TOP]: (maps) => maps.ControlPosition.RIGHT_TOP,
  [ControlPosition.RIGHT_CENTER]: (maps) => maps.ControlPosition.RIGHT_CENTER,
  [ControlPosition.RIGHT_BOTTOM]: (maps) => maps.ControlPosition.RIGHT_BOTTOM,
  [ControlPosition.BOTTOM_LEFT]: (maps) => maps.ControlPosition.BOTTOM_LEFT,
  [ControlPosition.BOTTOM_CENTER]: (maps) => maps.ControlPosition.BOTTOM_CENTER,
  [ControlPosition.BOTTOM_RIGHT]: (maps) => maps.ControlPosition.BOTTOM_RIGHT,
  [ControlPosition.INLINE_START_BLOCK_START]: (maps) =>
    maps.ControlPosition.INLINE_START_BLOCK_START,
  [ControlPosition.INLINE_START_BLOCK_CENTER]: (maps) =>
    maps.ControlPosition.INLINE_START_BLOCK_CENTER,
  [ControlPosition.INLINE_START_BLOCK_END]: (maps) => maps.ControlPosition.INLINE_START_BLOCK_END,
  [ControlPosition.INLINE_END_BLOCK_START]: (maps) => maps.ControlPosition.INLINE_END_BLOCK_START,
  [ControlPosition.INLINE_END_BLOCK_CENTER]: (maps) => maps.ControlPosition.INLINE_END_BLOCK_CENTER,
  [ControlPosition.INLINE_END_BLOCK_END]: (maps) => maps.ControlPosition.INLINE_END_BLOCK_END,
  [ControlPosition.BLOCK_START_INLINE_START]: (maps) =>
    maps.ControlPosition.BLOCK_START_INLINE_START,
  [ControlPosition.BLOCK_START_INLINE_CENTER]: (maps) =>
    maps.ControlPosition.BLOCK_START_INLINE_CENTER,
  [ControlPosition.BLOCK_START_INLINE_END]: (maps) => maps.ControlPosition.BLOCK_START_INLINE_END,
  [ControlPosition.BLOCK_END_INLINE_START]: (maps) => maps.ControlPosition.BLOCK_END_INLINE_START,
  [ControlPosition.BLOCK_END_INLINE_CENTER]: (maps) => maps.ControlPosition.BLOCK_END_INLINE_CENTER,
  [ControlPosition.BLOCK_END_INLINE_END]: (maps) => maps.ControlPosition.BLOCK_END_INLINE_END,
}

export function getControlPosition(position: ControlPosition, maps?: typeof google.maps) {
  const target = ControlPositionMap[position]
  if (target) {
    return target(maps || google.maps)
  }
  return (maps || google.maps).ControlPosition.TOP_LEFT
}
