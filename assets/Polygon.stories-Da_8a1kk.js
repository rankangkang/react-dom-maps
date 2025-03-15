import{r as o,e as s}from"./index-CintVSxK.js";import{E as p}from"./common-CodZrReM.js";import{u as G,g as b}from"./helper-DOGBPK0M.js";import{C as T}from"./Control-CQ1SsE3N.js";const h=e=>{const{paths:i,options:t}=e,{map:m,maps:g}=G(),[a,E]=o.useState(null);return o.useEffect(()=>{const n=new g.Polygon({map:m});return E(n),()=>{n==null||n.setMap(null)}},[m]),o.useEffect(()=>{a&&a.setOptions({paths:i,...t})},[t,i,a]),o.useEffect(()=>{if(!a)return;const n=[];if(t!=null&&t.clickable&&e.onClick){const r=a.addListener("click",l=>{var c;(c=e.onClick)==null||c.call(e,l)});n.push(r)}if(t!=null&&t.editable&&e.onChange){const r=l=>{var x;const c=a.getPath().getArray().map(P=>({latitude:P.lat(),longitude:P.lng()})).map(b);(x=e.onChange)==null||x.call(e,l,c)};n.push(a.getPath().addListener("insert_at",r),a.getPath().addListener("remove_at",r))}if(t!=null&&t.draggable)return e.onDragStart&&n.push(a.addListener("dragstart",r=>{var l;(l=e.onDragStart)==null||l.call(e,r)})),e.onDrag&&n.push(a.addListener("drag",r=>{var l;(l=e.onDrag)==null||l.call(e,r)})),e.onDragEnd&&n.push(a.addListener("dragend",r=>{var c;const l=a==null?void 0:a.getPath().getArray().map(b);(c=e.onDragEnd)==null||c.call(e,r,l)})),()=>{n.forEach(r=>{g.event.removeListener(r)})}},[t==null?void 0:t.clickable,t==null?void 0:t.draggable,t==null?void 0:t.editable,a]),null},$=[{lat:22.3,lng:114.1},{lat:22.3,lng:114.2},{lat:22.4,lng:114.2},{lat:22.4,lng:114.1}],y={component:h,args:{paths:$,options:{editable:!1,draggable:!1,clickable:!1,strokeColor:"#000",strokeOpacity:.5,fillColor:"#000",fillOpacity:.5}},tags:["autodocs"]},u={render(e){return s.createElement(p,null,s.createElement(h,{...e}))}},d={args:{options:{draggable:!0}},render(e){const[i,t]=o.useState(e.paths||[]),[m,g]=o.useState(!1),a=o.useCallback(()=>{g(!0)},[]),E=o.useCallback((n,r)=>{g(!1),r&&t(r)},[]);return s.createElement(p,null,s.createElement(T,{position:()=>google.maps.ControlPosition.TOP_LEFT,id:"top-left-panel"},s.createElement("div",{className:"ml-[24px]"},s.createElement("p",{className:"text-[#fff] text-[20px]"},"status: ",m?"dragging":"not dragging"),s.createElement("p",{className:"text-[#fff] text-[20px]"},"current path:"," ",i.map(n=>s.createElement("p",null,`(${n.lat}, ${n.lng})`))))),s.createElement(h,{...e,onDragStart:a,onDragEnd:E}))}},f={args:{options:{editable:!0}},render(e){const[i,t]=o.useState(e.paths||[]),m=o.useCallback((g,a)=>{a&&t(a)},[]);return s.createElement(p,null,s.createElement(T,{position:()=>google.maps.ControlPosition.TOP_LEFT,id:"top-left-panel"},s.createElement("div",{className:"ml-[24px]"},s.createElement("p",{className:"text-[#fff] text-[20px]"},"current path:"," ",i.map(g=>s.createElement("p",null,`(${g.lat}, ${g.lng})`))))),s.createElement(h,{...e,onChange:m}))}};var C,L,D;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render(args) {
    return <ExampleGoogleMap>
        <Polygon {...args} />
      </ExampleGoogleMap>;
  }
}`,...(D=(L=u.parameters)==null?void 0:L.docs)==null?void 0:D.source}}};var S,_,k;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    options: {
      draggable: true
    }
  },
  render(args) {
    const [paths, setPaths] = useState<LatLng[]>(args.paths || []);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const onDragStart = useCallback(() => {
      setIsDragging(true);
    }, []);
    const onDragEnd = useCallback((_: google.maps.MapMouseEvent, nextPaths?: LatLng[]) => {
      setIsDragging(false);
      if (nextPaths) {
        setPaths(nextPaths);
      }
    }, []);
    return <ExampleGoogleMap>
        <Control position={() => google.maps.ControlPosition.TOP_LEFT} id="top-left-panel">
          <div className="ml-[24px]">
            <p className="text-[#fff] text-[20px]">
              status: {isDragging ? 'dragging' : 'not dragging'}
            </p>
            <p className="text-[#fff] text-[20px]">
              current path:{' '}
              {paths.map(item => {
              return <p>{\`(\${item.lat}, \${item.lng})\`}</p>;
            })}
            </p>
          </div>
        </Control>
        <Polygon {...args} onDragStart={onDragStart} onDragEnd={onDragEnd} />
      </ExampleGoogleMap>;
  }
}`,...(k=(_=d.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var M,v,N;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    options: {
      editable: true
    }
  },
  render(args) {
    const [paths, setPaths] = useState<LatLng[]>(args.paths || []);
    const onChange = useCallback((_: google.maps.MapMouseEvent, nextPaths?: LatLng[]) => {
      if (nextPaths) {
        setPaths(nextPaths);
      }
    }, []);
    return <ExampleGoogleMap>
        <Control position={() => google.maps.ControlPosition.TOP_LEFT} id="top-left-panel">
          <div className="ml-[24px]">
            <p className="text-[#fff] text-[20px]">
              current path:{' '}
              {paths.map(item => {
              return <p>{\`(\${item.lat}, \${item.lng})\`}</p>;
            })}
            </p>
          </div>
        </Control>
        <Polygon {...args} onChange={onChange} />
      </ExampleGoogleMap>;
  }
}`,...(N=(v=f.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};const F=["SimplePolygon","DraggablePolygon","EditablePolygon"],z=Object.freeze(Object.defineProperty({__proto__:null,DraggablePolygon:d,EditablePolygon:f,SimplePolygon:u,__namedExportsOrder:F,default:y},Symbol.toStringTag,{value:"Module"}));export{z as P};
