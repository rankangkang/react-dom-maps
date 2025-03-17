import type { Meta, StoryObj } from '@storybook/react'
import React, { useMemo } from 'react'

import { GoogleMap } from '../../../src/GoogleMap'
import { useGoogleMap, UseGoogleMapOptions } from '../../../src/useGoogleMap'

const meta: Meta<typeof GoogleMap> = {
  title: 'Components/GoogleMap',
  component: GoogleMap,
}

export default meta
type Story = StoryObj<typeof GoogleMap>

export const Example: Story = {
  render() {
    const options = useMemo(() => {
      const options: UseGoogleMapOptions = {
        loader: {
          // apiKey: YOUR_GOOGLE_MAP_API_KEY,
          // @ts-expect-error
          apiKey: undefined,
        },
        map: {
          mapTypeId: 'roadmap',
          center: {
            lat: 22.3193,
            lng: 114.1694,
          },
          zoom: 12,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          disableDefaultUI: true,
        },
      }
      return options
    }, [])

    const { api, ref } = useGoogleMap(options)

    return (
      <div className="w-full h-[600px]">
        <GoogleMap className="w-full h-full relative" api={api} containerRef={ref}>
          {/* any child to render */}
        </GoogleMap>
      </div>
    )
  },
}
