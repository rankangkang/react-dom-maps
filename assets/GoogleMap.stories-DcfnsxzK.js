import{r as i,e as o}from"./index-CintVSxK.js";import{G as l,u as m}from"./useGoogleMap-DzI1fyv9.js";const u={title:"Components/GoogleMap",component:l},e={render(){const s=i.useMemo(()=>({loader:{apiKey:void 0},map:{mapTypeId:"roadmap",center:{lat:22.3193,lng:114.1694},zoom:12,zoomControl:!1,mapTypeControl:!1,scaleControl:!1,streetViewControl:!1,rotateControl:!1,disableDefaultUI:!0}}),[]),{api:n,ref:p}=m(s);return o.createElement("div",{className:"w-full h-[600px]"},o.createElement(l,{className:"w-full h-full relative",api:n,containerRef:p}))}};var a,t,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render() {
    const options = useMemo(() => {
      const options: UseGoogleMapOptions = {
        loader: {
          // apiKey: YOUR_GOOGLE_MAP_API_KEY,
          // @ts-expect-error
          apiKey: undefined
        },
        map: {
          mapTypeId: 'roadmap',
          center: {
            lat: 22.3193,
            lng: 114.1694
          },
          zoom: 12,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          disableDefaultUI: true
        }
      };
      return options;
    }, []);
    const {
      api,
      ref
    } = useGoogleMap(options);
    return <div className="w-full h-[600px]">
        <GoogleMap className="w-full h-full relative" api={api} containerRef={ref}>
          {/* any child to render */}
        </GoogleMap>
      </div>;
  }
}`,...(r=(t=e.parameters)==null?void 0:t.docs)==null?void 0:r.source}}};const C=["Example"];export{e as Example,C as __namedExportsOrder,u as default};
