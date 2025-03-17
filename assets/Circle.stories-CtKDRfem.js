import{r as t,e as r}from"./index-CintVSxK.js";import{M as n}from"./types-D2AkDWY3.js";import"./useGoogleMap-DzI1fyv9.js";import{u as B,E as G}from"./ExampleContainer-CXFv5vZI.js";import{a as k,g as a,d as S,b as J}from"./helper-Bbmc8aaZ.js";import{a as K,C as Q}from"./Control-D7WGYPLR.js";const v=s=>{const{_instance:l,center:i=null,radius:p=0,clickable:c=!0,draggable:f=!1,editable:m=!1,fillColor:C,fillOpacity:E,strokeColor:b,strokeOpacity:D,strokePosition:x,strokeWeight:o,visible:O=!0,zIndex:_,onChange:M,onClick:h,onDblClick:L,onContextMenu:N,onDragStart:F,onDrag:P,onDragEnd:y,onMouseDown:I,onMouseUp:R,onMouseOver:T,onMouseMove:q,onMouseOut:$}=s,{map:w,maps:z}=B(),e=t.useMemo(()=>l||new z.Circle,[z,l]);return t.useEffect(()=>(e.setMap(w),()=>e.setMap(null)),[e,w]),t.useEffect(()=>e.setVisible(O),[e,O]),t.useEffect(()=>e.setCenter(i),[e,i]),t.useEffect(()=>e.setRadius(p),[e,p]),t.useEffect(()=>e.setDraggable(f),[e,f]),t.useEffect(()=>e.setEditable(m),[e,m]),t.useEffect(()=>{e.setOptions({clickable:c,fillColor:C,fillOpacity:E,strokeColor:b,strokeOpacity:D,strokePosition:x,strokeWeight:o,zIndex:_})},[e,c,C,E,b,D,x,o,_]),t.useEffect(()=>{const g=k(e,{[n.Click]:a(e,h),[n.DblClick]:a(e,L),[n.ContextMenu]:a(e,N),[n.MouseUp]:a(e,R),[n.MouseDown]:a(e,I),[n.MouseOver]:a(e,T),[n.MouseOut]:a(e,$),[n.MouseMove]:a(e,q)});return()=>S(g)},[e,h,N,L,R,I,T,$]),t.useEffect(()=>{const g=k(e,{[n.DragStart]:a(e,F),[n.Drag]:a(e,P),[n.DragEnd]:a(e,y)});return()=>S(g)},[e,F,y,P]),t.useEffect(()=>{const g=k(e,{[n.CenterChanged]:a(e,M),[n.RadiusChanged]:a(e,M)});return()=>S(g)},[e,M]),null},X={title:"Components/Circle",component:v,args:{center:{lat:22.3,lng:114.1},radius:1e4,editable:!1,draggable:!1,clickable:!0,strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2,strokePosition:0,visible:!0,zIndex:0,fillColor:"#FF0000",fillOpacity:.35},decorators:s=>r.createElement(G,null,r.createElement(s,null))},u={args:{},render(s){return r.createElement(v,{...s})}},d={args:{editable:!0,draggable:!0},render(s){const[l,i]=t.useState({center:s.center,radius:s.radius}),[p,c]=t.useState(!1),f=t.useCallback(()=>{c(!0)},[]),m=t.useCallback((x,o)=>{c(!1),i({center:o.getCenter(),radius:o.getRadius()})},[]),C=t.useCallback((x,o)=>{i({center:o.getCenter(),radius:o.getRadius()})},[]),{lat:E,lng:b}=J(l.center),D=l.radius;return r.createElement(r.Fragment,null,r.createElement(K,{position:Q.TOP_LEFT,id:"top-left-panel"},r.createElement("div",{className:"ml-[24px]"},r.createElement("p",{className:"text-[#fff] text-[20px]"},"status: ",p?"dragging":"not dragging"),r.createElement("p",{className:"text-[#fff] text-[20px]"},"center: ",`(${E}, ${b})`),r.createElement("p",{className:"text-[#fff] text-[20px]"},"radius: ",D))),r.createElement(v,{...s,...l,onDragStart:f,onDragEnd:m,onChange:C}))}};var j,A,U;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {},
  render(args) {
    return <Circle {...args} />;
  }
}`,...(U=(A=u.parameters)==null?void 0:A.docs)==null?void 0:U.source}}};var W,H,V;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    editable: true,
    draggable: true
  },
  render(args) {
    const [data, setData] = useState<{
      center: LatLng;
      radius: number;
    }>({
      center: args.center!,
      radius: args.radius!
    });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const onDragStart = useCallback(() => {
      setIsDragging(true);
    }, []);
    const onDragEnd = useCallback((_: google.maps.MapMouseEvent, instance: google.maps.Circle) => {
      setIsDragging(false);
      setData({
        center: instance.getCenter()!,
        radius: instance.getRadius()
      });
    }, []);
    const onChange = useCallback((_: google.maps.MapMouseEvent, instance: google.maps.Circle) => {
      setData({
        center: instance.getCenter()!,
        radius: instance.getRadius()
      });
    }, []);
    const {
      lat,
      lng
    } = getLatLngLiteral(data.center);
    const radius = data.radius;
    return <>
        <Control position={ControlPosition.TOP_LEFT} id="top-left-panel">
          <div className="ml-[24px]">
            <p className="text-[#fff] text-[20px]">
              status: {isDragging ? 'dragging' : 'not dragging'}
            </p>
            <p className="text-[#fff] text-[20px]">center: {\`(\${lat}, \${lng})\`}</p>
            <p className="text-[#fff] text-[20px]">radius: {radius}</p>
          </div>
        </Control>
        <Circle {...args} {...data} onDragStart={onDragStart} onDragEnd={onDragEnd} onChange={onChange} />
      </>;
  }
}`,...(V=(H=d.parameters)==null?void 0:H.docs)==null?void 0:V.source}}};const Y=["SimpleCircle","DraggableAndEditableCircle"],se=Object.freeze(Object.defineProperty({__proto__:null,DraggableAndEditableCircle:d,SimpleCircle:u,__namedExportsOrder:Y,default:X},Symbol.toStringTag,{value:"Module"}));export{se as C};
