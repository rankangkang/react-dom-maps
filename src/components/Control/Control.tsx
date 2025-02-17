import { isFunction } from "lodash";
import { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useGoogleMapContext } from "../../context";

export interface ControlProps {
  id: string;
  position:
    | google.maps.ControlPosition
    | ((maps: typeof google.maps) => google.maps.ControlPosition);
  className?: string;
}

export const Control: React.FC<PropsWithChildren<ControlProps>> = (props) => {
  const { id, position, className = "", children } = props;
  const { map, maps } = useGoogleMapContext();
  const divRef = useRef<HTMLDivElement>(document.createElement("div"));
  const finalPosition = isFunction(position) ? position(maps) : position;

  useEffect(() => {
    divRef.current.dataset.id = id;
    map.controls[finalPosition].push(divRef.current);

    return () => {
      map.controls[finalPosition].forEach((e, index) => {
        if (e.dataset.id === id) {
          map.controls[finalPosition].removeAt(index);
        }
      });
    };
  }, [id, finalPosition, map]);

  useEffect(() => {
    divRef.current.className = className;
  }, [className]);

  return createPortal(children, divRef.current, id);
};
