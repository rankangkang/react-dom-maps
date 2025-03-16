import{r as t,e as n}from"./index-CintVSxK.js";import{E as W}from"./ExampleContainer-B9efYmIJ.js";import{u as B}from"./useGoogleMapContext-e6VUXdr1.js";import{M as a}from"./types-D2AkDWY3.js";import{a as F,d as j,g as r,b as J}from"./helper-Bbmc8aaZ.js";import{a as K,C as Q}from"./Control-uemoNCNg.js";const b=s=>{const{_instance:u,paths:m,clickable:l=!0,draggable:g=!1,editable:f=!1,fillColor:d,fillOpacity:c,geodesic:o,strokeColor:E,strokeOpacity:C,strokePosition:x,strokeWeight:M,visible:P=!0,zIndex:y,onClick:h,onDblClick:S,onContextMenu:k,onDragStart:v,onDrag:O,onDragEnd:L,onMouseDown:_,onMouseUp:N,onMouseOver:I,onMouseMove:q,onMouseOut:T}=s,{map:$,maps:w}=B(),e=t.useMemo(()=>u||new w.Polygon,[w,u]);return t.useEffect(()=>(e.setMap($),()=>e.setMap(null)),[e,$]),t.useEffect(()=>e.setPath(m??[]),[e,m]),t.useEffect(()=>e.setVisible(P),[e,P]),t.useEffect(()=>e.setDraggable(g),[e,g]),t.useEffect(()=>e.setEditable(f),[e,f]),t.useEffect(()=>{e.setOptions({clickable:l,geodesic:o,fillColor:d,fillOpacity:c,strokeColor:E,strokeOpacity:C,strokeWeight:M,strokePosition:x,zIndex:y})},[e,l,l,o,d,c,E,C,M,x,y]),t.useEffect(()=>{const D=F(e,{[a.Click]:r(e,h),[a.DblClick]:r(e,S),[a.ContextMenu]:r(e,k),[a.MouseUp]:r(e,N),[a.MouseDown]:r(e,_),[a.MouseOver]:r(e,I),[a.MouseOut]:r(e,T),[a.MouseMove]:r(e,q)});return()=>j(D)},[e,h,k,S,N,_,I,T]),t.useEffect(()=>{const D=F(e,{[a.DragStart]:r(e,v),[a.Drag]:r(e,O),[a.DragEnd]:r(e,L)});return()=>j(D)},[e,v,L,O]),null},R=[{lat:22.3,lng:114.1},{lat:22.3,lng:114.2},{lat:22.4,lng:114.2},{lat:22.4,lng:114.1}],X={title:"Components/Polygon",component:b,args:{paths:R,editable:!1,draggable:!1,clickable:!0,strokeColor:"#000",strokeOpacity:.5,fillColor:"#000",fillOpacity:.5},decorators:s=>n.createElement(W,null,n.createElement(s,null))},i={render(s){return n.createElement(W,null,n.createElement(b,{...s}))}},p={args:{draggable:!0},render(s){const[u,m]=t.useState(s.paths||[]),[l,g]=t.useState(!1),f=t.useCallback(()=>{g(!0)},[]),d=t.useCallback((c,o)=>{g(!1),m(o.getPath().getArray())},[]);return n.createElement(n.Fragment,null,n.createElement(K,{position:Q.TOP_LEFT,id:"top-left-panel"},n.createElement("div",{className:"ml-[24px]"},n.createElement("p",{className:"text-[#fff] text-[20px]"},"status: ",l?"dragging":"not dragging"),n.createElement("p",{className:"text-[#fff] text-[20px]"},"current path:"),u.map(c=>{const{lat:o,lng:E}=J(c);return n.createElement("p",null,`(${o}, ${E})`)}))),n.createElement(b,{...s,onDragStart:f,onDragEnd:d}))}};var z,A,U;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render(args) {
    return <ExampleContainer>
        <Polygon {...args} />
      </ExampleContainer>;
  }
}`,...(U=(A=i.parameters)==null?void 0:A.docs)==null?void 0:U.source}}};var G,H,V;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    draggable: true
  },
  render(args) {
    const [paths, setPaths] = useState<LatLng[]>(args.paths || []);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const onDragStart = useCallback(() => {
      setIsDragging(true);
    }, []);
    const onDragEnd = useCallback((_: google.maps.MapMouseEvent, instance: google.maps.Polygon) => {
      setIsDragging(false);
      setPaths(instance.getPath().getArray());
    }, []);
    return <>
        <Control position={ControlPosition.TOP_LEFT} id="top-left-panel">
          <div className="ml-[24px]">
            <p className="text-[#fff] text-[20px]">
              status: {isDragging ? 'dragging' : 'not dragging'}
            </p>
            <p className="text-[#fff] text-[20px]">current path:</p>
            {paths.map(item => {
            const {
              lat,
              lng
            } = getLatLngLiteral(item);
            return <p>{\`(\${lat}, \${lng})\`}</p>;
          })}
          </div>
        </Control>
        <Polygon {...args} onDragStart={onDragStart} onDragEnd={onDragEnd} />
      </>;
  }
}`,...(V=(H=p.parameters)==null?void 0:H.docs)==null?void 0:V.source}}};const Y=["SimplePolygon","DraggablePolygon"],se=Object.freeze(Object.defineProperty({__proto__:null,DraggablePolygon:p,SimplePolygon:i,__namedExportsOrder:Y,default:X},Symbol.toStringTag,{value:"Module"}));export{se as P};
