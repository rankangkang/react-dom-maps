import{r as w,e as f}from"./index-CintVSxK.js";import{l as ut,M as N}from"./Marker-CLXWYoYS.js";import{a as ft,C as mt}from"./Control-D7WGYPLR.js";import{E as yt,u as wt}from"./ExampleContainer-CXFv5vZI.js";import"./useGoogleMap-DzI1fyv9.js";import"./index-CqdiiMci.js";const H=[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array],z=1,b=8;class U{static from(t){if(!(t instanceof ArrayBuffer))throw new Error("Data must be an instance of ArrayBuffer.");const[e,n]=new Uint8Array(t,0,2);if(e!==219)throw new Error("Data does not appear to be in a KDBush format.");const o=n>>4;if(o!==z)throw new Error(`Got v${o} data when expected v${z}.`);const i=H[n&15];if(!i)throw new Error("Unrecognized array type.");const[l]=new Uint16Array(t,2,1),[h]=new Uint32Array(t,4,1);return new U(h,l,i,t)}constructor(t,e=64,n=Float64Array,o){if(isNaN(t)||t<0)throw new Error(`Unpexpected numItems value: ${t}.`);this.numItems=+t,this.nodeSize=Math.min(Math.max(+e,2),65535),this.ArrayType=n,this.IndexArrayType=t<65536?Uint16Array:Uint32Array;const i=H.indexOf(this.ArrayType),l=t*2*this.ArrayType.BYTES_PER_ELEMENT,h=t*this.IndexArrayType.BYTES_PER_ELEMENT,s=(8-h%8)%8;if(i<0)throw new Error(`Unexpected typed array class: ${n}.`);o&&o instanceof ArrayBuffer?(this.data=o,this.ids=new this.IndexArrayType(this.data,b,t),this.coords=new this.ArrayType(this.data,b+h+s,t*2),this._pos=t*2,this._finished=!0):(this.data=new ArrayBuffer(b+l+h+s),this.ids=new this.IndexArrayType(this.data,b,t),this.coords=new this.ArrayType(this.data,b+h+s,t*2),this._pos=0,this._finished=!1,new Uint8Array(this.data,0,2).set([219,(z<<4)+i]),new Uint16Array(this.data,2,1)[0]=e,new Uint32Array(this.data,4,1)[0]=t)}add(t,e){const n=this._pos>>1;return this.ids[n]=n,this.coords[this._pos++]=t,this.coords[this._pos++]=e,n}finish(){const t=this._pos>>1;if(t!==this.numItems)throw new Error(`Added ${t} items when expected ${this.numItems}.`);return Z(this.ids,this.coords,this.nodeSize,0,this.numItems-1,0),this._finished=!0,this}range(t,e,n,o){if(!this._finished)throw new Error("Data not yet indexed - call index.finish().");const{ids:i,coords:l,nodeSize:h}=this,s=[0,i.length-1,0],a=[];for(;s.length;){const c=s.pop()||0,u=s.pop()||0,p=s.pop()||0;if(u-p<=h){for(let m=p;m<=u;m++){const M=l[2*m],E=l[2*m+1];M>=t&&M<=n&&E>=e&&E<=o&&a.push(i[m])}continue}const d=p+u>>1,g=l[2*d],y=l[2*d+1];g>=t&&g<=n&&y>=e&&y<=o&&a.push(i[d]),(c===0?t<=g:e<=y)&&(s.push(p),s.push(d-1),s.push(1-c)),(c===0?n>=g:o>=y)&&(s.push(d+1),s.push(u),s.push(1-c))}return a}within(t,e,n){if(!this._finished)throw new Error("Data not yet indexed - call index.finish().");const{ids:o,coords:i,nodeSize:l}=this,h=[0,o.length-1,0],s=[],a=n*n;for(;h.length;){const c=h.pop()||0,u=h.pop()||0,p=h.pop()||0;if(u-p<=l){for(let m=p;m<=u;m++)V(i[2*m],i[2*m+1],t,e)<=a&&s.push(o[m]);continue}const d=p+u>>1,g=i[2*d],y=i[2*d+1];V(g,y,t,e)<=a&&s.push(o[d]),(c===0?t-n<=g:e-n<=y)&&(h.push(p),h.push(d-1),h.push(1-c)),(c===0?t+n>=g:e+n>=y)&&(h.push(d+1),h.push(u),h.push(1-c))}return s}}function Z(r,t,e,n,o,i){if(o-n<=e)return;const l=n+o>>1;lt(r,t,l,n,o,i),Z(r,t,e,n,l-1,1-i),Z(r,t,e,l+1,o,1-i)}function lt(r,t,e,n,o,i){for(;o>n;){if(o-n>600){const a=o-n+1,c=e-n+1,u=Math.log(a),p=.5*Math.exp(2*u/3),d=.5*Math.sqrt(u*p*(a-p)/a)*(c-a/2<0?-1:1),g=Math.max(n,Math.floor(e-c*p/a+d)),y=Math.min(o,Math.floor(e+(a-c)*p/a+d));lt(r,t,e,g,y,i)}const l=t[2*e+i];let h=n,s=o;for(D(r,t,n,e),t[2*o+i]>l&&D(r,t,n,o);h<s;){for(D(r,t,h,s),h++,s--;t[2*h+i]<l;)h++;for(;t[2*s+i]>l;)s--}t[2*n+i]===l?D(r,t,n,s):(s++,D(r,t,s,o)),s<=e&&(n=s+1),e<=s&&(o=s-1)}}function D(r,t,e,n){R(r,e,n),R(t,2*e,2*n),R(t,2*e+1,2*n+1)}function R(r,t,e){const n=r[t];r[t]=r[e],r[e]=n}function V(r,t,e,n){const o=r-e,i=t-n;return o*o+i*i}const Mt={minZoom:0,maxZoom:16,minPoints:2,radius:40,extent:512,nodeSize:64,log:!1,generateId:!1,reduce:null,map:r=>r},q=Math.fround||(r=>t=>(r[0]=+t,r[0]))(new Float32Array(1)),A=2,S=3,B=4,_=5,ht=6;class Et{constructor(t){this.options=Object.assign(Object.create(Mt),t),this.trees=new Array(this.options.maxZoom+1),this.stride=this.options.reduce?7:6,this.clusterProps=[]}load(t){const{log:e,minZoom:n,maxZoom:o}=this.options;e&&console.time("total time");const i=`prepare ${t.length} points`;e&&console.time(i),this.points=t;const l=[];for(let s=0;s<t.length;s++){const a=t[s];if(!a.geometry)continue;const[c,u]=a.geometry.coordinates,p=q(F(c)),d=q(v(u));l.push(p,d,1/0,s,-1,1),this.options.reduce&&l.push(0)}let h=this.trees[o+1]=this._createTree(l);e&&console.timeEnd(i);for(let s=o;s>=n;s--){const a=+Date.now();h=this.trees[s]=this._createTree(this._cluster(h,s)),e&&console.log("z%d: %d clusters in %dms",s,h.numItems,+Date.now()-a)}return e&&console.timeEnd("total time"),this}getClusters(t,e){let n=((t[0]+180)%360+360)%360-180;const o=Math.max(-90,Math.min(90,t[1]));let i=t[2]===180?180:((t[2]+180)%360+360)%360-180;const l=Math.max(-90,Math.min(90,t[3]));if(t[2]-t[0]>=360)n=-180,i=180;else if(n>i){const u=this.getClusters([n,o,180,l],e),p=this.getClusters([-180,o,i,l],e);return u.concat(p)}const h=this.trees[this._limitZoom(e)],s=h.range(F(n),v(l),F(i),v(o)),a=h.data,c=[];for(const u of s){const p=this.stride*u;c.push(a[p+_]>1?G(a,p,this.clusterProps):this.points[a[p+S]])}return c}getChildren(t){const e=this._getOriginId(t),n=this._getOriginZoom(t),o="No cluster with the specified id.",i=this.trees[n];if(!i)throw new Error(o);const l=i.data;if(e*this.stride>=l.length)throw new Error(o);const h=this.options.radius/(this.options.extent*Math.pow(2,n-1)),s=l[e*this.stride],a=l[e*this.stride+1],c=i.within(s,a,h),u=[];for(const p of c){const d=p*this.stride;l[d+B]===t&&u.push(l[d+_]>1?G(l,d,this.clusterProps):this.points[l[d+S]])}if(u.length===0)throw new Error(o);return u}getLeaves(t,e,n){e=e||10,n=n||0;const o=[];return this._appendLeaves(o,t,e,n,0),o}getTile(t,e,n){const o=this.trees[this._limitZoom(t)],i=Math.pow(2,t),{extent:l,radius:h}=this.options,s=h/l,a=(n-s)/i,c=(n+1+s)/i,u={features:[]};return this._addTileFeatures(o.range((e-s)/i,a,(e+1+s)/i,c),o.data,e,n,i,u),e===0&&this._addTileFeatures(o.range(1-s/i,a,1,c),o.data,i,n,i,u),e===i-1&&this._addTileFeatures(o.range(0,a,s/i,c),o.data,-1,n,i,u),u.features.length?u:null}getClusterExpansionZoom(t){let e=this._getOriginZoom(t)-1;for(;e<=this.options.maxZoom;){const n=this.getChildren(t);if(e++,n.length!==1)break;t=n[0].properties.cluster_id}return e}_appendLeaves(t,e,n,o,i){const l=this.getChildren(e);for(const h of l){const s=h.properties;if(s&&s.cluster?i+s.point_count<=o?i+=s.point_count:i=this._appendLeaves(t,s.cluster_id,n,o,i):i<o?i++:t.push(h),t.length===n)break}return i}_createTree(t){const e=new U(t.length/this.stride|0,this.options.nodeSize,Float32Array);for(let n=0;n<t.length;n+=this.stride)e.add(t[n],t[n+1]);return e.finish(),e.data=t,e}_addTileFeatures(t,e,n,o,i,l){for(const h of t){const s=h*this.stride,a=e[s+_]>1;let c,u,p;if(a)c=pt(e,s,this.clusterProps),u=e[s],p=e[s+1];else{const y=this.points[e[s+S]];c=y.properties;const[m,M]=y.geometry.coordinates;u=F(m),p=v(M)}const d={type:1,geometry:[[Math.round(this.options.extent*(u*i-n)),Math.round(this.options.extent*(p*i-o))]],tags:c};let g;a||this.options.generateId?g=e[s+S]:g=this.points[e[s+S]].id,g!==void 0&&(d.id=g),l.features.push(d)}}_limitZoom(t){return Math.max(this.options.minZoom,Math.min(Math.floor(+t),this.options.maxZoom+1))}_cluster(t,e){const{radius:n,extent:o,reduce:i,minPoints:l}=this.options,h=n/(o*Math.pow(2,e)),s=t.data,a=[],c=this.stride;for(let u=0;u<s.length;u+=c){if(s[u+A]<=e)continue;s[u+A]=e;const p=s[u],d=s[u+1],g=t.within(s[u],s[u+1],h),y=s[u+_];let m=y;for(const M of g){const E=M*c;s[E+A]>e&&(m+=s[E+_])}if(m>y&&m>=l){let M=p*y,E=d*y,x,$=-1;const k=((u/c|0)<<5)+(e+1)+this.points.length;for(const gt of g){const C=gt*c;if(s[C+A]<=e)continue;s[C+A]=e;const W=s[C+_];M+=s[C]*W,E+=s[C+1]*W,s[C+B]=k,i&&(x||(x=this._map(s,u,!0),$=this.clusterProps.length,this.clusterProps.push(x)),i(x,this._map(s,C)))}s[u+B]=k,a.push(M/m,E/m,1/0,k,-1,m),i&&a.push($)}else{for(let M=0;M<c;M++)a.push(s[u+M]);if(m>1)for(const M of g){const E=M*c;if(!(s[E+A]<=e)){s[E+A]=e;for(let x=0;x<c;x++)a.push(s[E+x])}}}}return a}_getOriginId(t){return t-this.points.length>>5}_getOriginZoom(t){return(t-this.points.length)%32}_map(t,e,n){if(t[e+_]>1){const l=this.clusterProps[t[e+ht]];return n?Object.assign({},l):l}const o=this.points[t[e+S]].properties,i=this.options.map(o);return n&&i===o?Object.assign({},i):i}}function G(r,t,e){return{type:"Feature",id:r[t+S],properties:pt(r,t,e),geometry:{type:"Point",coordinates:[xt(r[t]),_t(r[t+1])]}}}function pt(r,t,e){const n=r[t+_],o=n>=1e4?`${Math.round(n/1e3)}k`:n>=1e3?`${Math.round(n/100)/10}k`:n,i=r[t+ht],l=i===-1?{}:Object.assign({},e[i]);return Object.assign(l,{cluster:!0,cluster_id:r[t+S],point_count:n,point_count_abbreviated:o})}function F(r){return r/360+.5}function v(r){const t=Math.sin(r*Math.PI/180),e=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return e<0?0:e>1?1:e}function xt(r){return(r-.5)*360}function _t(r){const t=(180-r*360)*Math.PI/180;return 360*Math.atan(Math.exp(t))/Math.PI-90}var J=Object.prototype.hasOwnProperty;function K(r,t,e){for(e of r.keys())if(I(e,t))return e}function I(r,t){var e,n,o;if(r===t)return!0;if(r&&t&&(e=r.constructor)===t.constructor){if(e===Date)return r.getTime()===t.getTime();if(e===RegExp)return r.toString()===t.toString();if(e===Array){if((n=r.length)===t.length)for(;n--&&I(r[n],t[n]););return n===-1}if(e===Set){if(r.size!==t.size)return!1;for(n of r)if(o=n,o&&typeof o=="object"&&(o=K(t,o),!o)||!t.has(o))return!1;return!0}if(e===Map){if(r.size!==t.size)return!1;for(n of r)if(o=n[0],o&&typeof o=="object"&&(o=K(t,o),!o)||!I(n[1],t.get(o)))return!1;return!0}if(e===ArrayBuffer)r=new Uint8Array(r),t=new Uint8Array(t);else if(e===DataView){if((n=r.byteLength)===t.byteLength)for(;n--&&r.getInt8(n)===t.getInt8(n););return n===-1}if(ArrayBuffer.isView(r)){if((n=r.byteLength)===t.byteLength)for(;n--&&r[n]===t[n];);return n===-1}if(!e||typeof r=="object"){n=0;for(e in r)if(J.call(r,e)&&++n&&!J.call(t,e)||!(e in t)||!I(r[e],t[e]))return!1;return Object.keys(t).length===n}}return r!==r&&t!==t}function St(r){var t=w.useRef(r),e=w.useRef(0);return I(r,t.current)||(t.current=r,e.current+=1),w.useMemo(function(){return t.current},[e.current])}function Ct(r,t){return w.useEffect(r,St(t))}function dt(r){return e=>{const n={...ut.omit(e,"children")};return f.createElement(N,{...n},f.createElement(r,{...e}))}}const j=r=>f.createElement("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1488",width:r.width||28,height:r.height||28},f.createElement("path",{d:"M787.7 339.7C787.7 187.4 664.3 64 512 64c-152.3 0-275.7 123.4-275.7 275.7 0 50.3 13.7 97.2 37.2 137.8h-0.3L512 960l238.9-482.5h-0.3c23.5-40.6 37.1-87.5 37.1-137.8M512 477.5c-76.1 0-137.8-61.7-137.8-137.8 0-76.1 61.7-137.8 137.8-137.8 76.2 0 137.8 61.8 137.8 137.8 0.1 76.1-61.6 137.8-137.8 137.8",fill:"#982414","p-id":"1489"}));j.__docgenInfo={description:"",methods:[],displayName:"PinIcon",props:{width:{required:!1,tsType:{name:"number"},description:""},height:{required:!1,tsType:{name:"number"},description:""}}};const At={title:"Components/Marker",component:N,args:{lat:22.3193,lng:114.1694,zIndex:0,children:f.createElement(j,null),origin:"bottomCenter",originOffset:[0,6],draggable:!1,onDrag:()=>{},onDragStart:()=>{},onDragEnd:()=>{}},decorators:r=>f.createElement(yt,null,f.createElement(r,null))},P={args:{origin:"center"},render(r){return f.createElement(N,{...r},f.createElement("div",{className:"w-[20px] h-[20px] rounded-[50%] bg-[#ee0000]"}))}},L={render(){const r=w.useMemo(()=>dt(j),[]);return f.createElement(r,{lat:22.3,lng:114.17,origin:"bottomCenter",originOffset:[0,6]})}},T={args:{draggable:!0},render(r){const[t,e]=w.useState({lat:22.3193,lng:114.1694}),[n,o]=w.useState(!1),i=w.useCallback(()=>{o(!0)},[]),l=w.useCallback((s,a)=>{o(!0),e(a.latlng)},[]),h=w.useCallback((s,a)=>{o(!1),e(a.latlng)},[]);return f.createElement(f.Fragment,null,f.createElement(ft,{position:mt.TOP_LEFT,id:"top-left-panel"},f.createElement("div",{className:"ml-[24px]"},f.createElement("p",{className:"text-[#fff] text-[20px]"},"status: ",n?"dragging":"not dragging"),f.createElement("p",{className:"text-[#fff] text-[20px]"},"current latlng: ",`(${t.lat}, ${t.lng})`))),f.createElement(N,{...r,onDragStart:i,onDrag:l,onDragEnd:h}))}},bt=dt(r=>{if(r.isCluster){const n=18+Math.floor(Math.log10(r.pointCount??0))*Math.log2(r.zoom);return f.createElement("div",{style:{width:n,height:n},className:"relative rounded-[50%] bg-radial from-[#d09b9b] to-[#f80202] flex justify-center items-center shadow-[0px_0px_6px_#d09b9b]"},r.pointCount)}return f.createElement("div",{className:"w-[10px] h-[10px] rounded-[50%] bg-[#c82a2a]"})}),O={args:{},render(){const{map:r}=wt(),[t,e]=w.useState({zoom:0,bounds:[]}),n=w.useRef([]);w.useEffect(()=>{const a=r.addListener("idle",()=>{try{const c=r.getBounds();if(!c)return;const u=c==null?void 0:c.getNorthEast(),p=c==null?void 0:c.getSouthWest();if(!u||!p)return;const d=[p.lng(),p.lat(),u.lng(),u.lat()];if(!ut.isEqual(d,n.current)){const g=r.getZoom()??12;e({zoom:g,bounds:d}),n.current=d}}catch(c){console.error(c)}});return()=>{a.remove()}},[r]);const[o,i]=w.useState([]),l=w.useMemo(()=>{const a={lat:22.3193,lng:114.1694},c=5;return Array.from({length:1e4},()=>{const d=Number((a.lat+(Math.random()-.5)*c).toFixed(6)),g=Number((a.lng+(Math.random()-.5)*c).toFixed(6));return{lat:d,lng:g}})},[]),h=w.useRef();Ct(()=>{if(t){if(!h.current){const a=new Et;a.load(l.map(c=>({type:"Feature",geometry:{type:"Point",coordinates:[c.lng,c.lat]},properties:{}}))),h.current=a}i(h.current.getClusters(t.bounds,t.zoom))}},[t]);const s=w.useMemo(()=>o.map(a=>{const[c,u]=a.geometry.coordinates;return{key:a.id,lat:u,lng:c,isCluster:a.properties.cluster,pointCount:a.properties.point_count}}),[o]);return f.createElement(f.Fragment,null,s.map(a=>f.createElement(bt,{...a,zoom:(t==null?void 0:t.zoom)??12})))}};var Y,Q,X;P.parameters={...P.parameters,docs:{...(Y=P.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    origin: 'center'
  },
  render(args) {
    return <Marker {...args}>
        <div className="w-[20px] h-[20px] rounded-[50%] bg-[#ee0000]"></div>
      </Marker>;
  }
}`,...(X=(Q=P.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var tt,et,nt;L.parameters={...L.parameters,docs:{...(tt=L.parameters)==null?void 0:tt.docs,source:{originalSource:`{
  render() {
    const Pin = useMemo(() => createMarker(PinIcon), []);
    return <Pin lat={22.3} lng={114.17} origin="bottomCenter" originOffset={[0, 6]} />;
  }
}`,...(nt=(et=L.parameters)==null?void 0:et.docs)==null?void 0:nt.source}}};var rt,st,ot;T.parameters={...T.parameters,docs:{...(rt=T.parameters)==null?void 0:rt.docs,source:{originalSource:`{
  args: {
    draggable: true
  },
  render(args) {
    const [latlng, setLatLng] = useState<LatLng>({
      lat: 22.3193,
      lng: 114.1694
    });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const onDragStart = useCallback(() => {
      setIsDragging(true);
    }, []);
    const onDrag = useCallback((e: any, data: {
      latlng: LatLng;
    }) => {
      setIsDragging(true);
      setLatLng(data.latlng);
    }, []);
    const onDragEnd = useCallback((e: any, data: {
      latlng: LatLng;
    }) => {
      setIsDragging(false);
      setLatLng(data.latlng);
    }, []);
    return <>
        <Control position={ControlPosition.TOP_LEFT} id="top-left-panel">
          <div className="ml-[24px]">
            <p className="text-[#fff] text-[20px]">
              status: {isDragging ? 'dragging' : 'not dragging'}
            </p>
            <p className="text-[#fff] text-[20px]">
              current latlng: {\`(\${latlng.lat}, \${latlng.lng})\`}
            </p>
          </div>
        </Control>
        <Marker {...args} onDragStart={onDragStart} onDrag={onDrag} onDragEnd={onDragEnd} />
      </>;
  }
}`,...(ot=(st=T.parameters)==null?void 0:st.docs)==null?void 0:ot.source}}};var it,at,ct;O.parameters={...O.parameters,docs:{...(it=O.parameters)==null?void 0:it.docs,source:{originalSource:`{
  args: {},
  render() {
    const {
      map
    } = useMapCtx();
    const [mapState, setMapState] = useState<{
      zoom: number;
      bounds: number[];
    }>({
      zoom: 0,
      bounds: []
    });
    const lastMapBounds = useRef<number[]>([]);
    useEffect(() => {
      const listener = map.addListener('idle', () => {
        // 检测 bounds 是否移动
        try {
          const bounds = map.getBounds();
          if (!bounds) {
            return;
          }
          const ne = bounds?.getNorthEast();
          const sw = bounds?.getSouthWest();
          if (!ne || !sw) {
            return;
          }
          const edgeBounds = [sw.lng(), sw.lat(), ne.lng(), ne.lat()];
          if (!isEqual(edgeBounds, lastMapBounds.current)) {
            const zoom = map.getZoom() ?? 12;
            setMapState({
              zoom,
              bounds: edgeBounds
            });
            lastMapBounds.current = edgeBounds;
          }
        } catch (e) {
          console.error(e);
        }
      });
      return () => {
        listener.remove();
      };
    }, [map]);
    const [clusters, setClusters] = useState<Array<SuperCluster.PointFeature<SuperCluster.AnyProps>>>([]);
    const coordinates = useMemo(() => {
      const center = {
        lat: 22.3193,
        lng: 114.1694
      };
      const radius = 5;
      const points = 10000; // number of points to generate

      const randomCoordinates = Array.from({
        length: points
      }, () => {
        const randomLat = Number((center.lat + (Math.random() - 0.5) * radius).toFixed(6));
        const randomLng = Number((center.lng + (Math.random() - 0.5) * radius).toFixed(6));
        return {
          lat: randomLat,
          lng: randomLng
        };
      });
      return randomCoordinates;
    }, []);
    const clusterRef = useRef<SuperCluster>();
    useDeepCompareEffect(() => {
      if (!mapState) {
        return;
      }
      if (!clusterRef.current) {
        const instance = new SuperCluster();
        instance.load(coordinates.map(item => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [item.lng, item.lat]
            },
            properties: {}
          };
        }));
        clusterRef.current = instance;
      }
      setClusters(clusterRef.current.getClusters(mapState.bounds as any, mapState.zoom));
    }, [mapState]);
    const coords2Show = useMemo(() => {
      return clusters.map(item => {
        const [lng, lat] = item.geometry.coordinates;
        return {
          key: item.id,
          lat,
          lng,
          isCluster: item.properties.cluster as boolean,
          pointCount: item.properties.point_count as number
        };
      });
    }, [clusters]);
    return <>
        {coords2Show.map(item => <RedDot {...item} zoom={mapState?.zoom ?? 12} />)}
      </>;
  }
}`,...(ct=(at=O.parameters)==null?void 0:at.docs)==null?void 0:ct.source}}};const Dt=["WrappedWithMarker","CreateMarkerHOC","DraggableMarker","MarkerCluster"],vt=Object.freeze(Object.defineProperty({__proto__:null,CreateMarkerHOC:L,DraggableMarker:T,MarkerCluster:O,WrappedWithMarker:P,__namedExportsOrder:Dt,default:At},Symbol.toStringTag,{value:"Module"}));export{vt as M,O as a};
