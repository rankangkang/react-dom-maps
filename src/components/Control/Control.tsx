import { isFunction } from 'lodash'
import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { useMapCtx } from '../../context'

import { ControlPosition, getControlPosition } from './helper'

export { ControlPosition }

export interface ControlProps {
  id: string
  position: ControlPosition
  className?: string
  children?: ReactNode
}

export const Control = (props: ControlProps) => {
  const { id, position, className = '', children } = props
  const { map, maps } = useMapCtx()
  const divRef = useRef<HTMLDivElement>(document.createElement('div'))

  useEffect(() => {
    const finalPosition = getControlPosition(position, maps)
    divRef.current.dataset.id = id
    map.controls[finalPosition].push(divRef.current)

    return () => {
      map.controls[finalPosition].forEach((e, index) => {
        if (e.dataset.id === id) {
          map.controls[finalPosition].removeAt(index)
        }
      })
    }
  }, [id, position, map])

  useEffect(() => {
    divRef.current.className = className
  }, [className])

  return createPortal(children, divRef.current, id)
}
