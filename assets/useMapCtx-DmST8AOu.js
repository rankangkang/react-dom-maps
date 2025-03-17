import{j as n}from"./index-QlSisDSG.js";import{useMDXComponents as p}from"./index-CIay_dDh.js";import"./GoogleMap.stories-DcfnsxzK.js";import"./iframe-e6kKNdsN.js";import"./index-CintVSxK.js";import"./index-BMBcyzG5.js";import"./index-CqdiiMci.js";import"./index-Cf3yyvpF.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";import"./useGoogleMap-DzI1fyv9.js";function t(e){const o={code:"code",h1:"h1",p:"p",pre:"pre",...p(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(o.h1,{id:"usemapctx",children:"useMapCtx"}),`
`,n.jsxs(o.p,{children:["The ",n.jsx(o.code,{children:"useMapCtx"})," hook allows you to access the Google Maps API context, but it can only be used within components wrapped by the ",n.jsx(o.code,{children:"<GoogleMap />"})," component."]}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`import { GoogleMap, useGoogleMap, useMapCtx } from 'react-dom-maps'

function App() {
  const { api, ref } = useGoogleMap(yourOption)
  return (
    <div>
      <GoogleMap api={api} containerRef={ref}>
        <A />
      </GoogleMap>
      <B />
    </div>
  )
}

function A() {
  // ✅ A is wrapped in \`<GoogleMap />\`
  const { map, maps } = useMapCtx()
  return <div />
}

function B() {
  // ❌ B is outside of \`<GoogleMap />\` and cannot use \`useMapCtx\`
  const { map, maps } = useMapCtx()
  return <div />
}
`})})]})}function h(e={}){const{wrapper:o}={...p(),...e.components};return o?n.jsx(o,{...e,children:n.jsx(t,{...e})}):t(e)}export{h as default};
