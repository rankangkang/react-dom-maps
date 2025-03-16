import{r as t,e as r}from"./index-CintVSxK.js";import{E as H}from"./ExampleContainer-B9efYmIJ.js";import{u as V}from"./useGoogleMapContext-e6VUXdr1.js";import{a as W,g as n,d as $,b as q}from"./helper-Bbmc8aaZ.js";import{M as a}from"./types-D2AkDWY3.js";import{a as B,C as J}from"./Control-uemoNCNg.js";const b=s=>{const{_instance:l,path:u,clickable:m=!0,draggable:g=!1,editable:f=!1,geodesic:d,icons:i,strokeColor:o,strokeOpacity:E,strokeWeight:M,visible:h=!0,zIndex:x,onClick:P,onDblClick:C,onContextMenu:y,onDragStart:k,onDrag:S,onDragEnd:v,onMouseDown:L,onMouseUp:O,onMouseOver:_,onMouseMove:G,onMouseOut:I}=s,{map:N,maps:T}=V(),e=t.useMemo(()=>l||new T.Polyline,[T,l]);return t.useEffect(()=>(e.setMap(N),()=>e.setMap(null)),[N]),t.useEffect(()=>e.setPath(u??[]),[e,u]),t.useEffect(()=>e.setVisible(h),[e,h]),t.useEffect(()=>e.setDraggable(g),[e,g]),t.useEffect(()=>e.setEditable(f),[e,f]),t.useEffect(()=>{e.setOptions({clickable:m,geodesic:d,icons:i,strokeColor:o,strokeOpacity:E,strokeWeight:M,zIndex:x})},[m,d,i,o,E,M,x]),t.useEffect(()=>{const D=W(e,{[a.Click]:n(e,P),[a.DblClick]:n(e,C),[a.ContextMenu]:n(e,y),[a.MouseUp]:n(e,O),[a.MouseDown]:n(e,L),[a.MouseOver]:n(e,_),[a.MouseOut]:n(e,I),[a.MouseMove]:n(e,G)});return()=>$(D)},[e,P,y,C,O,L,_,I]),t.useEffect(()=>{const D=W(e,{[a.DragStart]:n(e,k),[a.Drag]:n(e,S),[a.DragEnd]:n(e,v)});return()=>$(D)},[e,k,v,S]),null},K=[{lat:22.3193,lng:114.2115},{lat:22.3193,lng:114.1694},{lat:22.2855,lng:114.1577},{lat:22.3964,lng:114.1095},{lat:22.3701,lng:114.1142}],Q={title:"Components/Polyline",component:b,args:{path:K,clickable:!0,editable:!1,draggable:!1,visible:!0,zIndex:0,strokeColor:"#000",strokeOpacity:.8,strokeWeight:5},argTypes:{},decorators:s=>r.createElement(H,null,r.createElement(s,null))},c={render(s){return r.createElement(b,{...s})}},p={args:{strokeWeight:8,draggable:!0},render(s){const[l,u]=t.useState(s.path||[]),[m,g]=t.useState(!1),f=t.useCallback(()=>{g(!0)},[]),d=t.useCallback((i,o)=>{g(!1),u(o.getPath().getArray())},[]);return r.createElement(r.Fragment,null,r.createElement(B,{position:J.TOP_LEFT,id:"top-left-panel"},r.createElement("div",{className:"ml-[24px]"},r.createElement("p",{className:"text-[#fff] text-[20px]"},"status: ",m?"dragging":"not dragging"),r.createElement("p",{className:"text-[#fff] text-[20px]"},"current path: "),l.map(i=>{const{lat:o,lng:E}=q(i);return r.createElement("p",null,`(${o}, ${E})`)}))),r.createElement(b,{...s,path:l,onDragStart:f,onDragEnd:d}))}};var w,z,F;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render(args) {
    return <Polyline {...args} />;
  }
}`,...(F=(z=c.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};var j,A,U;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    strokeWeight: 8,
    draggable: true
    // editable: true,
  },
  render(args) {
    const [path, setPath] = useState<LatLng[]>(args.path || []);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const onDragStart = useCallback(() => {
      setIsDragging(true);
    }, []);
    const onDragEnd = useCallback((_: google.maps.MapMouseEvent, instance: google.maps.Polyline) => {
      setIsDragging(false);
      setPath(instance.getPath().getArray());
    }, []);
    return <>
        <Control position={ControlPosition.TOP_LEFT} id="top-left-panel">
          <div className="ml-[24px]">
            <p className="text-[#fff] text-[20px]">
              status: {isDragging ? 'dragging' : 'not dragging'}
            </p>
            <p className="text-[#fff] text-[20px]">current path: </p>
            {path.map(item => {
            const {
              lat,
              lng
            } = getLatLngLiteral(item);
            return <p>{\`(\${lat}, \${lng})\`}</p>;
          })}
          </div>
        </Control>

        <Polyline {...args} path={path} onDragStart={onDragStart} onDragEnd={onDragEnd} />
      </>;
  }
}`,...(U=(A=p.parameters)==null?void 0:A.docs)==null?void 0:U.source}}};const R=["SimplePolyline","DraggablePolyline"],ae=Object.freeze(Object.defineProperty({__proto__:null,DraggablePolyline:p,SimplePolyline:c,__namedExportsOrder:R,default:Q},Symbol.toStringTag,{value:"Module"}));export{ae as P};
