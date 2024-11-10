import React, { memo, RefObject } from "react";

import { cn } from "./utils/dom";
import { GoogleMapApi } from "./GoogleMap.types";
import { GoogleMapContextProvider } from "./GoogleMap.context";

export interface GoogleMapProps {
  className?: string;
  style?: React.CSSProperties;
  api?: GoogleMapApi;
  containerRef: RefObject<HTMLDivElement>;
  children?: React.ReactNode;
  classNames?: {
    map?: string;
    children?: string;
  };
}

/** use with useGoogleMap */
export const GoogleMap = memo<GoogleMapProps>((props) => {
  const { api, containerRef, className, style, classNames } = props;

  return (
    <div className={cn(className)} style={style}>
      <div className={cn(classNames?.map)} ref={containerRef} />
      {api && (
        <GoogleMapContextProvider map={api.map} maps={api.maps}>
          <div className={cn(classNames?.children)}>{props.children}</div>
        </GoogleMapContextProvider>
      )}
    </div>
  );
});
