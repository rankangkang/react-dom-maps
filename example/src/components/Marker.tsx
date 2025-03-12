import { createMarker } from '../../../src'

export const Marker = createMarker((props: { width?: number; height?: number }) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1488"
      width={props.width || 28}
      height={props.height || 28}
    >
      <path
        d="M787.7 339.7C787.7 187.4 664.3 64 512 64c-152.3 0-275.7 123.4-275.7 275.7 0 50.3 13.7 97.2 37.2 137.8h-0.3L512 960l238.9-482.5h-0.3c23.5-40.6 37.1-87.5 37.1-137.8M512 477.5c-76.1 0-137.8-61.7-137.8-137.8 0-76.1 61.7-137.8 137.8-137.8 76.2 0 137.8 61.8 137.8 137.8 0.1 76.1-61.6 137.8-137.8 137.8"
        fill="#982414"
        p-id="1489"
      ></path>
    </svg>
  )
})
