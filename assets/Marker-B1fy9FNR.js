import{j as e,M as a,A as i,S as c,a as p}from"./index-QlSisDSG.js";import{useMDXComponents as t}from"./index-CIay_dDh.js";import{M as m,a as o}from"./Marker.stories-BdeytYCg.js";import"./iframe-e6kKNdsN.js";import"./index-CintVSxK.js";import"./index-BMBcyzG5.js";import"./index-CqdiiMci.js";import"./index-Cf3yyvpF.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";import"./Marker-CLXWYoYS.js";import"./useGoogleMap-DzI1fyv9.js";import"./ExampleContainer-CXFv5vZI.js";import"./helper-Bbmc8aaZ.js";import"./Control-D7WGYPLR.js";function s(n){const r={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...t(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:m}),`
`,e.jsx(r.h1,{id:"marker",children:"Marker"}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"<Marker />"})," component API allows you to render custom markers on the map."]}),`
`,e.jsx(i,{}),`
`,e.jsx(r.h2,{id:"custom-marker-element",children:"Custom Marker Element"}),`
`,e.jsx(r.p,{children:"There are two ways to render a marker:"}),`
`,e.jsxs(r.ol,{children:[`
`,e.jsxs(r.li,{children:["Wrap your custom element with the ",e.jsx(r.code,{children:"<Marker>"})," component:"]}),`
`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`import { Marker, MarkerProps } from 'react-dom-maps'

const CustomMarker = (props: MarkerProps) => {
  return (
    <Marker {...props}>
      <div className="w-[20px] h-[20px] rounded-[50%] bg-[#ee0000]" />
    </Marker>
  )
}
`})}),`
`,e.jsxs(r.ol,{start:"2",children:[`
`,e.jsxs(r.li,{children:["Use the ",e.jsx(r.code,{children:"createMarker"})," HOC to create a custom marker:"]}),`
`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`import { createMarker } from 'react-dom-maps'

const RedDot = createMarker((props: { isCluster?: boolean; pointCount?: number; zoom: number }) => {
  if (props.isCluster) {
    const baseSize = 18
    const extraSize = Math.floor(Math.log10(props.pointCount ?? 0))
    const finalSize = baseSize + extraSize * Math.log2(props.zoom)
    return (
      <div
        style={{ width: finalSize, height: finalSize }}
        className="relative rounded-[50%] bg-radial from-[#d09b9b] to-[#f80202] flex justify-center items-center shadow-[0px_0px_6px_#d09b9b]"
      >
        {props.pointCount}
      </div>
    )
  }
  return <div className="w-[10px] h-[10px] rounded-[50%] bg-[#c82a2a]"></div>
})
`})}),`
`,e.jsx(r.h2,{id:"marker-clustering",children:"Marker Clustering"}),`
`,e.jsxs(r.p,{children:["To render cluster markers, you can use ",e.jsx(r.a,{href:"https://github.com/mapbox/supercluster",rel:"nofollow",children:"supercluster"})," for assistance."]}),`
`,e.jsx(c,{of:o}),`
`,e.jsx(p,{of:o})]})}function z(n={}){const{wrapper:r}={...t(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(s,{...n})}):s(n)}export{z as default};
