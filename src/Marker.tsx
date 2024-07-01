import React, { useMemo } from "react";

import {
  OverlayComponentType,
  OverlayType,
  WithOverlayType,
} from "./GoogleMap.types";
import { MarkerDraggable, MarkerOrigin } from "./Marker.types";
import { MarkerOverlay } from "./Marker.options";

export interface MarkerProps extends MarkerDraggable {
  lat: number;
  lng: number;
  zIndex?: number;
  origin?: MarkerOrigin;
  children?: React.ReactNode;
}

type MarkerComponentType<T extends MarkerProps = MarkerProps> =
  OverlayComponentType<T>;

export const createMarker = <M extends MarkerProps, C>(
  Wrapped: React.ComponentType<C>,
) => {
  const NextMarker: MarkerComponentType<M & C> = (props) => {
    const { children, ...pickedProps } = props;
    return (
      <Marker {...pickedProps}>
        <Wrapped {...props} />
      </Marker>
    );
  };

  NextMarker.overlayType = OverlayType.MARKER;

  return NextMarker;
};

export const Marker: MarkerComponentType & {
  createMarker: typeof createMarker;
} = (props) => {
  if (!React.isValidElement(props.children)) {
    return null;
  }

  const { lat, lng, ...rest } = props;
  const position = useMemo(() => ({ lat, lng }), [lat, lng]);

  return (
    <MarkerOverlay pane="floatPane" position={position} {...rest}>
      {React.cloneElement(props.children, {
        ...props.children.props,
      })}
    </MarkerOverlay>
  );
};

Marker.overlayType = OverlayType.MARKER;

Marker.createMarker = createMarker;
