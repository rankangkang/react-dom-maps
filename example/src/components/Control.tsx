import { Control } from '../../../src'

import { BackCenter, RouteLine, ZoomIn, ZoomOut } from './Icon'

export const BottomCenterControl = (props: {
  onZoomIn?: () => void
  onZoomOut?: () => void
  onBackCenter?: () => void
  onToggleRoute?: () => void
}) => {
  return (
    <Control
      position={(google) => google.ControlPosition.BOTTOM_CENTER}
      id={'bottom-center-control'}
      className="relative h-[72px]"
    >
      <div className="bg-[#fff] w-[480px] rounded-[24px] absolute left-0 -translate-x-1/2 flex justify-evenly px-[24px] py-[12px]">
        {props.onZoomIn && (
          <div title="zoom in" className="cursor-pointer" onClick={props.onZoomIn}>
            <ZoomIn />
          </div>
        )}
        {props.onZoomOut && (
          <div title="zoom out" className="cursor-pointer" onClick={props.onZoomOut}>
            <ZoomOut />
          </div>
        )}
        {props.onBackCenter && (
          <div title="back to center" className="cursor-pointer" onClick={props.onBackCenter}>
            <BackCenter />
          </div>
        )}
        {props.onToggleRoute && (
          <div
            title="toggle route visible"
            className="cursor-pointer"
            onClick={props.onToggleRoute}
          >
            <RouteLine />
          </div>
        )}
      </div>
    </Control>
  )
}
