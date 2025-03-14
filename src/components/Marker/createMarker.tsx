import { omit } from 'lodash'
import React, { ComponentType } from 'react'

import { Marker, MarkerProps } from './Marker'

/**
 * create marker that can render on google map
 * @param WrappedMarker
 */
export function createMarker<M extends MarkerProps, T extends object>(
  WrappedMarker: React.ComponentType<T>,
) {
  const NextMarker: ComponentType<M & T> = (props) => {
    const pickedProps = {
      ...omit(props, 'children'),
    }

    return (
      <Marker {...pickedProps}>
        <WrappedMarker {...props} />
      </Marker>
    )
  }

  return NextMarker
}
