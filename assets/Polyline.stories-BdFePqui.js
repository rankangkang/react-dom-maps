import{r as s,e as n}from"./index-CintVSxK.js";import{l as y,C as _}from"./Control-CQ1SsE3N.js";import{E as h}from"./common-CodZrReM.js";import{u as N,g as x}from"./helper-DOGBPK0M.js";const p=e=>{const{options:t,path:l}=e,{map:g}=N(),[a,i]=s.useState(null);return s.useEffect(()=>{const r=new google.maps.Polyline({map:g});return i(r),()=>{r.setMap(null)}},[g]),s.useEffect(()=>{a&&a.setOptions({path:l,...t})},[t,l,a]),s.useEffect(()=>{if(!a)return y.noop;let r=[];if(e!=null&&e.onMouseOut&&r.push(google.maps.event.addListener(a,"mouseout",e.onMouseOut)),e!=null&&e.onMouseOver&&r.push(google.maps.event.addListener(a,"mouseover",e.onMouseOver)),t!=null&&t.clickable&&e.onClick&&r.push(google.maps.event.addListener(a,"click",e.onClick)),t!=null&&t.editable&&e.onChange){const o=c=>{var E;const f=a.getPath().getArray().map(x);(E=e.onChange)==null||E.call(e,c,f)};r.push(google.maps.event.addListener(a.getPath(),"insert_at",o),google.maps.event.addListener(a.getPath(),"remove_at",o))}return t!=null&&t.draggable&&(e.onDragStart&&r.push(google.maps.event.addListener(a,"dragstart",e.onDragStart)),e.onDrag&&r.push(google.maps.event.addListener(a,"drag",e.onDrag)),e.onDragEnd&&r.push(google.maps.event.addListener(a,"dragend",o=>{var f;const c=a.getPath().getArray().map(x);(f=e.onDragEnd)==null||f.call(e,o,c)}))),()=>{r.forEach(o=>{google.maps.event.removeListener(o)})}},[a,t==null?void 0:t.clickable,t==null?void 0:t.editable,t==null?void 0:t.draggable]),null},T=[{lat:22.3193,lng:114.2115},{lat:22.3193,lng:114.1694},{lat:22.2855,lng:114.1577},{lat:22.3964,lng:114.1095},{lat:22.3701,lng:114.1142}],G={component:p,args:{path:T,options:{strokeColor:"#000",strokeOpacity:.8,strokeWeight:5,clickable:!1,editable:!1,draggable:!1}},argTypes:{}},m={render(e){return n.createElement(h,null,n.createElement(p,{...e}))}},u={args:{options:{strokeWeight:8,draggable:!0}},render(e){const[t,l]=s.useState(e.path||[]),[g,a]=s.useState(!1),i=s.useCallback(()=>{a(!0)},[]),r=s.useCallback((o,c)=>{a(!1),c&&l(c)},[]);return n.createElement(h,null,n.createElement(_,{position:()=>google.maps.ControlPosition.TOP_LEFT,id:"top-left-panel"},n.createElement("div",{className:"ml-[24px]"},n.createElement("p",{className:"text-[#fff] text-[20px]"},"status: ",g?"dragging":"not dragging"),n.createElement("p",{className:"text-[#fff] text-[20px]"},"current path:"," ",t.map(o=>n.createElement("p",null,`(${o.lat}, ${o.lng})`))))),n.createElement(p,{...e,onDragStart:i,onDragEnd:r}))}},d={args:{options:{editable:!0}},render(e){const[t,l]=s.useState(e.path||[]),g=s.useCallback((a,i)=>{i&&l(i)},[]);return n.createElement(h,null,n.createElement(_,{position:()=>google.maps.ControlPosition.TOP_LEFT,id:"top-left-panel"},n.createElement("div",{className:"ml-[24px]"},n.createElement("p",{className:"text-[#fff] text-[20px]"},"current path:"," ",t.map(a=>n.createElement("p",null,`(${a.lat}, ${a.lng})`))))),n.createElement(p,{...e,onChange:g}))}};var P,b,C;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render(args) {
    return <ExampleGoogleMap>
        <Polyline {...args} />
      </ExampleGoogleMap>;
  }
}`,...(C=(b=m.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var L,v,D;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    options: {
      strokeWeight: 8,
      draggable: true
    }
  },
  render(args) {
    const [paths, setPaths] = useState<LatLng[]>(args.path || []);
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

        <Polyline {...args} onDragStart={onDragStart} onDragEnd={onDragEnd} />
      </ExampleGoogleMap>;
  }
}`,...(D=(v=u.parameters)==null?void 0:v.docs)==null?void 0:D.source}}};var S,M,k;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    options: {
      editable: true
    }
  },
  render(args) {
    const [paths, setPaths] = useState<LatLng[]>(args.path || []);
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
        <Polyline {...args} onChange={onChange} />
      </ExampleGoogleMap>;
  }
}`,...(k=(M=d.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};const $=["SimplePolyline","DraggablePolyline","EditablePolyline"],A=Object.freeze(Object.defineProperty({__proto__:null,DraggablePolyline:u,EditablePolyline:d,SimplePolyline:m,__namedExportsOrder:$,default:G},Symbol.toStringTag,{value:"Module"}));export{A as P};
