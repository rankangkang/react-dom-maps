import React from "react";

import { OverlayType, WithOverlayType } from "./GoogleMap.types";

type AnonymouseOverlayType = WithOverlayType<React.ComponentType>;

/**
 * 筛选指定 overlayType 的元素
 * @deprecated 暂时没啥用
 * @param children
 * @param filterTypes 当该参数不传递或长度为 0 时，返回不含 overlayType 属性的元素（即非 Layer 元素）
 * @returns
 */
export function filterOverlayTypeElement(
  children: React.ReactNode,
  filterTypes?: Array<OverlayType>,
) {
  return React.Children.map(children, (child) => {
    if (!filterTypes || filterTypes.length === 0) {
      if (!React.isValidElement(child)) {
        return child;
      }
      if ((child.type as AnonymouseOverlayType).overlayType) {
        return null;
      }
      return child;
    }

    if (!React.isValidElement(child)) {
      return child;
    }

    if (
      !filterTypes.includes((child.type as AnonymouseOverlayType).overlayType)
    ) {
      return null;
    }

    return child;
  });
}
