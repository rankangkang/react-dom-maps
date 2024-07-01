import React, { useImperativeHandle, useRef } from "react";

import { GoogleMapApi } from "./GoogleMap.types";
import { cn } from "./GoogleMap.utils";
import { MapContextProvider } from "./GoogleMap.context";

export interface GoogleMapProps {
  api: GoogleMapApi;
  children?: React.ReactNode;
  className?: string;
  classNames?: {
    wrapper?: string;
    map?: string;
    children?: string;
  };
  style?: React.CSSProperties;
}

export type ElementType = HTMLDivElement;

export const GoogleMap = React.forwardRef<ElementType, GoogleMapProps>(
  (props, ref) => {
    const { api, children, className, classNames = {}, style } = props;
    const elRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => elRef.current!);

    const {
      wrapper: wrapperClassName,
      map: mapClassName,
      children: childrenClassName,
    } = classNames;
    return (
      <div
        className={cn("google-map-wrapper", className, wrapperClassName)}
        style={style}
      >
        <div className={cn("google-map", mapClassName)} ref={elRef} />
        {api && (
          <MapContextProvider {...api}>
            <div className={cn("google-map-children", childrenClassName)}>
              {children}
            </div>
          </MapContextProvider>
        )}
      </div>
    );
  },
);
