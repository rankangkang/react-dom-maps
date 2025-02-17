import { omit } from "lodash";
import React from "react";

import { OCType } from "../../types";

import { Marker, MarkerProps } from "./Marker";

/**
 * create marker that can render on google map
 * @param WrappedMarker
 */
export function createMarker<M extends MarkerProps, T extends {}>(
  WrappedMarker: React.ComponentType<T>,
) {
  const NextMarker: OCType<M & T> = (props) => {
    const pickedProps = {
      ...omit(props, "children"),
    };

    return (
      <Marker {...pickedProps}>
        <WrappedMarker {...props} />
      </Marker>
    );
  };

  return NextMarker;
}
