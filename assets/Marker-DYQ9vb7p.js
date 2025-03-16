import{j as r,M as a,A as i,S as c,a as l}from"./index-CATU0vjC.js";import{useMDXComponents as t}from"./index-CIay_dDh.js";import{M as p,a as s}from"./Marker.stories-Ds7cinmD.js";import"./iframe-Vkcw8iQM.js";import"./index-CintVSxK.js";import"./index-CqdiiMci.js";import"./index-Cf3yyvpF.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";import"./ExampleContainer-B9efYmIJ.js";import"./useGoogleMapContext-e6VUXdr1.js";import"./helper-Bbmc8aaZ.js";import"./Control-uemoNCNg.js";function o(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...t(),...n.components};return r.jsxs(r.Fragment,{children:[r.jsx(a,{of:p}),`
`,r.jsx(e.h1,{id:"marker",children:"Marker"}),`
`,r.jsxs(e.p,{children:["您可以使用 ",r.jsx(e.code,{children:"<Marker />"})," 组件 API 将您的自定义 Marker 绘制到地图上。"]}),`
`,r.jsx(i,{}),`
`,r.jsx(e.h2,{id:"custom-marker-element",children:"Custom marker element"}),`
`,r.jsx(e.p,{children:"渲染 Marker 有两种方式："}),`
`,r.jsxs(e.ol,{children:[`
`,r.jsxs(e.li,{children:["将你的自定义 Element 使用 ",r.jsx(e.code,{children:"<Marker>"})," 组件包裹"]}),`
`]}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-tsx",children:`import { Marker, MarkerProps } from 'react-dom-maps'

const CustomMarker = (props: MarkerProps) => {
  return (
    <Marker {...props}>
      <div className="w-[20px] h-[20px] rounded-[50%] bg-[#ee0000]" />
    </Marker>
  )
}
`})}),`
`,r.jsxs(e.ol,{start:"2",children:[`
`,r.jsxs(e.li,{children:["使用 ",r.jsx(e.code,{children:"createMarker"})," HOC 创建自定义 Marker"]}),`
`]}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-tsx",children:`import { createMarker } from 'react-dom-maps'

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
`,r.jsx(e.h2,{id:"marker-cluster",children:"Marker cluster"}),`
`,r.jsxs(e.p,{children:["可引入 ",r.jsx(e.a,{href:"https://github.com/mapbox/supercluster",rel:"nofollow",children:"supercluster"})," 辅助实现 cluster marker 渲染。"]}),`
`,r.jsx(c,{of:s}),`
`,r.jsx(l,{of:s})]})}function z(n={}){const{wrapper:e}={...t(),...n.components};return e?r.jsx(e,{...n,children:r.jsx(o,{...n})}):o(n)}export{z as default};
