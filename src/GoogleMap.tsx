import React, { memo, RefObject } from 'react'

import { cn } from './utils/dom'
import { GoogleMapApi } from './types'
import { Provider } from './context'

export interface GoogleMapProps {
  className?: string
  style?: React.CSSProperties
  api?: GoogleMapApi
  containerRef: RefObject<HTMLDivElement>
  children?: React.ReactNode
  classNames?: {
    map?: string
    children?: string
  }
}

/** use with useGoogleMap */
export const GoogleMap = memo<GoogleMapProps>((props) => {
  const { api, containerRef, className, style, classNames } = props

  return (
    <div className={cn(className)} style={style}>
      <div style={{ height: '100%' }} className={cn(classNames?.map)} ref={containerRef} />
      {api ? (
        <Provider map={api.map} maps={api.maps}>
          <div className={cn(classNames?.children)}>{props.children}</div>
        </Provider>
      ) : null}
    </div>
  )
})
