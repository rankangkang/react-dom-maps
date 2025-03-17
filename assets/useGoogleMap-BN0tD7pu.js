import{j as e,a as i}from"./index-QlSisDSG.js";import{useMDXComponents as t}from"./index-CIay_dDh.js";import{Example as r}from"./GoogleMap.stories-DcfnsxzK.js";import"./iframe-e6kKNdsN.js";import"./index-CintVSxK.js";import"./index-BMBcyzG5.js";import"./index-CqdiiMci.js";import"./index-Cf3yyvpF.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";import"./useGoogleMap-DzI1fyv9.js";function s(n){const o={a:"a",code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...t(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o.h1,{id:"usegooglemap",children:"useGoogleMap"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"<GoogleMap />"})," component does not include functionality to load the Google Maps API. This means you need to handle the API loading yourself."]}),`
`,e.jsxs(o.p,{children:["To achieve this, you can use the exported ",e.jsx(o.code,{children:"useGoogleMap"})," hook, which is built on top of ",e.jsx(o.a,{href:"https://www.npmjs.com/package/@googlemaps/js-api-loader",rel:"nofollow",children:e.jsx(o.code,{children:"@googlemaps/js-api-loader"})}),"."]}),`
`,e.jsx(i,{of:r}),`
`,e.jsx(o.p,{children:"Please ensure that the configuration object you pass has a stable reference. Otherwise, unnecessary API loads and re-renders may occur. To avoid this, you can:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:"Promote the configuration to a global variable."}),`
`,e.jsxs(o.li,{children:["Wrap the configuration using caching methods like ",e.jsx(o.code,{children:"useMemo"}),"."]}),`
`]}),`
`,e.jsxs(o.p,{children:["Alternatively, you can load the Google Maps API using your own script. Once the API is loaded, simply pass the required ",e.jsx(o.code,{children:"map"})," instance and the ",e.jsx(o.code,{children:"google.maps"})," object to the ",e.jsx(o.code,{children:"<GoogleMap />"})," component."]})]})}function f(n={}){const{wrapper:o}={...t(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(s,{...n})}):s(n)}export{f as default};
