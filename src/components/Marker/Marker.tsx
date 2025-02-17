import { isNumber, omit } from "lodash";
import React, { FC, PropsWithChildren, memo, useMemo } from "react";

import { OCType } from "../../types";

import {
  MarkerDraggable,
  MarkerOrigin,
  MarkerOriginOffset,
} from "./types";
import { MarkerOverlay } from "./MarkerOverlay";

export interface MarkerProps extends MarkerDraggable {
  lat: number;
  lng: number;
  zIndex?: number;
  origin?: MarkerOrigin;
  originOffset?: number | MarkerOriginOffset;
}

/**
 * use Marker to wrap your marker icon
 * @param props
 * @returns
 */
export const Marker: FC<PropsWithChildren<MarkerProps>> = (props) => {
  if (!React.isValidElement(props.children)) {
    return null;
  }

  const { lat, lng, originOffset = [0, 0], ...rest } = props;
  const position = useMemo(() => ({ lat, lng }), [lat, lng]);
  const nextOriginOffset: MarkerOriginOffset = isNumber(originOffset)
    ? [originOffset, originOffset]
    : originOffset;

  return (
    <MarkerOverlay
      pane="floatPane"
      position={position}
      originOffset={nextOriginOffset}
      {...rest}
    >
      {props.children}
    </MarkerOverlay>
  );
};
