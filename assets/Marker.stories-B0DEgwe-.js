var Q=r=>{throw TypeError(r)};var ee=(r,e,t)=>e.has(r)||Q("Cannot "+t);var E=(r,e,t)=>(ee(r,e,"read from private field"),t?t.call(r):e.get(r)),L=(r,e,t)=>e.has(r)?Q("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(r):e.set(r,t),P=(r,e,t,n)=>(ee(r,e,"write to private field"),n?n.call(r,t):e.set(r,t),t);import{r as w,e as y}from"./index-CintVSxK.js";import{l as H,C as Pe}from"./Control-CQ1SsE3N.js";import{R as be}from"./index-CqdiiMci.js";import{c as Ce,E as Y,u as _e,G as De,d as Se}from"./common-CodZrReM.js";import{g as A,u as Le}from"./helper-DOGBPK0M.js";const te=[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array],$=1,T=8;class J{static from(e){if(!(e instanceof ArrayBuffer))throw new Error("Data must be an instance of ArrayBuffer.");const[t,n]=new Uint8Array(e,0,2);if(t!==219)throw new Error("Data does not appear to be in a KDBush format.");const s=n>>4;if(s!==$)throw new Error(`Got v${s} data when expected v${$}.`);const i=te[n&15];if(!i)throw new Error("Unrecognized array type.");const[u]=new Uint16Array(e,2,1),[p]=new Uint32Array(e,4,1);return new J(p,u,i,e)}constructor(e,t=64,n=Float64Array,s){if(isNaN(e)||e<0)throw new Error(`Unpexpected numItems value: ${e}.`);this.numItems=+e,this.nodeSize=Math.min(Math.max(+t,2),65535),this.ArrayType=n,this.IndexArrayType=e<65536?Uint16Array:Uint32Array;const i=te.indexOf(this.ArrayType),u=e*2*this.ArrayType.BYTES_PER_ELEMENT,p=e*this.IndexArrayType.BYTES_PER_ELEMENT,o=(8-p%8)%8;if(i<0)throw new Error(`Unexpected typed array class: ${n}.`);s&&s instanceof ArrayBuffer?(this.data=s,this.ids=new this.IndexArrayType(this.data,T,e),this.coords=new this.ArrayType(this.data,T+p+o,e*2),this._pos=e*2,this._finished=!0):(this.data=new ArrayBuffer(T+u+p+o),this.ids=new this.IndexArrayType(this.data,T,e),this.coords=new this.ArrayType(this.data,T+p+o,e*2),this._pos=0,this._finished=!1,new Uint8Array(this.data,0,2).set([219,($<<4)+i]),new Uint16Array(this.data,2,1)[0]=t,new Uint32Array(this.data,4,1)[0]=e)}add(e,t){const n=this._pos>>1;return this.ids[n]=n,this.coords[this._pos++]=e,this.coords[this._pos++]=t,n}finish(){const e=this._pos>>1;if(e!==this.numItems)throw new Error(`Added ${e} items when expected ${this.numItems}.`);return W(this.ids,this.coords,this.nodeSize,0,this.numItems-1,0),this._finished=!0,this}range(e,t,n,s){if(!this._finished)throw new Error("Data not yet indexed - call index.finish().");const{ids:i,coords:u,nodeSize:p}=this,o=[0,i.length-1,0],l=[];for(;o.length;){const c=o.pop()||0,a=o.pop()||0,h=o.pop()||0;if(a-h<=p){for(let m=h;m<=a;m++){const M=u[2*m],x=u[2*m+1];M>=e&&M<=n&&x>=t&&x<=s&&l.push(i[m])}continue}const g=h+a>>1,d=u[2*g],f=u[2*g+1];d>=e&&d<=n&&f>=t&&f<=s&&l.push(i[g]),(c===0?e<=d:t<=f)&&(o.push(h),o.push(g-1),o.push(1-c)),(c===0?n>=d:s>=f)&&(o.push(g+1),o.push(a),o.push(1-c))}return l}within(e,t,n){if(!this._finished)throw new Error("Data not yet indexed - call index.finish().");const{ids:s,coords:i,nodeSize:u}=this,p=[0,s.length-1,0],o=[],l=n*n;for(;p.length;){const c=p.pop()||0,a=p.pop()||0,h=p.pop()||0;if(a-h<=u){for(let m=h;m<=a;m++)ne(i[2*m],i[2*m+1],e,t)<=l&&o.push(s[m]);continue}const g=h+a>>1,d=i[2*g],f=i[2*g+1];ne(d,f,e,t)<=l&&o.push(s[g]),(c===0?e-n<=d:t-n<=f)&&(p.push(h),p.push(g-1),p.push(1-c)),(c===0?e+n>=d:t+n>=f)&&(p.push(g+1),p.push(a),p.push(1-c))}return o}}function W(r,e,t,n,s,i){if(s-n<=t)return;const u=n+s>>1;Me(r,e,u,n,s,i),W(r,e,t,n,u-1,1-i),W(r,e,t,u+1,s,1-i)}function Me(r,e,t,n,s,i){for(;s>n;){if(s-n>600){const l=s-n+1,c=t-n+1,a=Math.log(l),h=.5*Math.exp(2*a/3),g=.5*Math.sqrt(a*h*(l-h)/l)*(c-l/2<0?-1:1),d=Math.max(n,Math.floor(t-c*h/l+g)),f=Math.min(s,Math.floor(t+(l-c)*h/l+g));Me(r,e,t,d,f,i)}const u=e[2*t+i];let p=n,o=s;for(I(r,e,n,t),e[2*s+i]>u&&I(r,e,n,s);p<o;){for(I(r,e,p,o),p++,o--;e[2*p+i]<u;)p++;for(;e[2*o+i]>u;)o--}e[2*n+i]===u?I(r,e,n,o):(o++,I(r,e,o,s)),o<=t&&(n=o+1),t<=o&&(s=o-1)}}function I(r,e,t,n){G(r,t,n),G(e,2*t,2*n),G(e,2*t+1,2*n+1)}function G(r,e,t){const n=r[e];r[e]=r[t],r[t]=n}function ne(r,e,t,n){const s=r-t,i=e-n;return s*s+i*i}const Oe={minZoom:0,maxZoom:16,minPoints:2,radius:40,extent:512,nodeSize:64,log:!1,generateId:!1,reduce:null,map:r=>r},re=Math.fround||(r=>e=>(r[0]=+e,r[0]))(new Float32Array(1)),O=2,_=3,V=4,C=5,xe=6;class Ae{constructor(e){this.options=Object.assign(Object.create(Oe),e),this.trees=new Array(this.options.maxZoom+1),this.stride=this.options.reduce?7:6,this.clusterProps=[]}load(e){const{log:t,minZoom:n,maxZoom:s}=this.options;t&&console.time("total time");const i=`prepare ${e.length} points`;t&&console.time(i),this.points=e;const u=[];for(let o=0;o<e.length;o++){const l=e[o];if(!l.geometry)continue;const[c,a]=l.geometry.coordinates,h=re(j(c)),g=re(Z(a));u.push(h,g,1/0,o,-1,1),this.options.reduce&&u.push(0)}let p=this.trees[s+1]=this._createTree(u);t&&console.timeEnd(i);for(let o=s;o>=n;o--){const l=+Date.now();p=this.trees[o]=this._createTree(this._cluster(p,o)),t&&console.log("z%d: %d clusters in %dms",o,p.numItems,+Date.now()-l)}return t&&console.timeEnd("total time"),this}getClusters(e,t){let n=((e[0]+180)%360+360)%360-180;const s=Math.max(-90,Math.min(90,e[1]));let i=e[2]===180?180:((e[2]+180)%360+360)%360-180;const u=Math.max(-90,Math.min(90,e[3]));if(e[2]-e[0]>=360)n=-180,i=180;else if(n>i){const a=this.getClusters([n,s,180,u],t),h=this.getClusters([-180,s,i,u],t);return a.concat(h)}const p=this.trees[this._limitZoom(t)],o=p.range(j(n),Z(u),j(i),Z(s)),l=p.data,c=[];for(const a of o){const h=this.stride*a;c.push(l[h+C]>1?se(l,h,this.clusterProps):this.points[l[h+_]])}return c}getChildren(e){const t=this._getOriginId(e),n=this._getOriginZoom(e),s="No cluster with the specified id.",i=this.trees[n];if(!i)throw new Error(s);const u=i.data;if(t*this.stride>=u.length)throw new Error(s);const p=this.options.radius/(this.options.extent*Math.pow(2,n-1)),o=u[t*this.stride],l=u[t*this.stride+1],c=i.within(o,l,p),a=[];for(const h of c){const g=h*this.stride;u[g+V]===e&&a.push(u[g+C]>1?se(u,g,this.clusterProps):this.points[u[g+_]])}if(a.length===0)throw new Error(s);return a}getLeaves(e,t,n){t=t||10,n=n||0;const s=[];return this._appendLeaves(s,e,t,n,0),s}getTile(e,t,n){const s=this.trees[this._limitZoom(e)],i=Math.pow(2,e),{extent:u,radius:p}=this.options,o=p/u,l=(n-o)/i,c=(n+1+o)/i,a={features:[]};return this._addTileFeatures(s.range((t-o)/i,l,(t+1+o)/i,c),s.data,t,n,i,a),t===0&&this._addTileFeatures(s.range(1-o/i,l,1,c),s.data,i,n,i,a),t===i-1&&this._addTileFeatures(s.range(0,l,o/i,c),s.data,-1,n,i,a),a.features.length?a:null}getClusterExpansionZoom(e){let t=this._getOriginZoom(e)-1;for(;t<=this.options.maxZoom;){const n=this.getChildren(e);if(t++,n.length!==1)break;e=n[0].properties.cluster_id}return t}_appendLeaves(e,t,n,s,i){const u=this.getChildren(t);for(const p of u){const o=p.properties;if(o&&o.cluster?i+o.point_count<=s?i+=o.point_count:i=this._appendLeaves(e,o.cluster_id,n,s,i):i<s?i++:e.push(p),e.length===n)break}return i}_createTree(e){const t=new J(e.length/this.stride|0,this.options.nodeSize,Float32Array);for(let n=0;n<e.length;n+=this.stride)t.add(e[n],e[n+1]);return t.finish(),t.data=e,t}_addTileFeatures(e,t,n,s,i,u){for(const p of e){const o=p*this.stride,l=t[o+C]>1;let c,a,h;if(l)c=Ee(t,o,this.clusterProps),a=t[o],h=t[o+1];else{const f=this.points[t[o+_]];c=f.properties;const[m,M]=f.geometry.coordinates;a=j(m),h=Z(M)}const g={type:1,geometry:[[Math.round(this.options.extent*(a*i-n)),Math.round(this.options.extent*(h*i-s))]],tags:c};let d;l||this.options.generateId?d=t[o+_]:d=this.points[t[o+_]].id,d!==void 0&&(g.id=d),u.features.push(g)}}_limitZoom(e){return Math.max(this.options.minZoom,Math.min(Math.floor(+e),this.options.maxZoom+1))}_cluster(e,t){const{radius:n,extent:s,reduce:i,minPoints:u}=this.options,p=n/(s*Math.pow(2,t)),o=e.data,l=[],c=this.stride;for(let a=0;a<o.length;a+=c){if(o[a+O]<=t)continue;o[a+O]=t;const h=o[a],g=o[a+1],d=e.within(o[a],o[a+1],p),f=o[a+C];let m=f;for(const M of d){const x=M*c;o[x+O]>t&&(m+=o[x+C])}if(m>f&&m>=u){let M=h*f,x=g*f,v,D=-1;const b=((a/c|0)<<5)+(t+1)+this.points.length;for(const U of d){const S=U*c;if(o[S+O]<=t)continue;o[S+O]=t;const X=o[S+C];M+=o[S]*X,x+=o[S+1]*X,o[S+V]=b,i&&(v||(v=this._map(o,a,!0),D=this.clusterProps.length,this.clusterProps.push(v)),i(v,this._map(o,S)))}o[a+V]=b,l.push(M/m,x/m,1/0,b,-1,m),i&&l.push(D)}else{for(let M=0;M<c;M++)l.push(o[a+M]);if(m>1)for(const M of d){const x=M*c;if(!(o[x+O]<=t)){o[x+O]=t;for(let v=0;v<c;v++)l.push(o[x+v])}}}}return l}_getOriginId(e){return e-this.points.length>>5}_getOriginZoom(e){return(e-this.points.length)%32}_map(e,t,n){if(e[t+C]>1){const u=this.clusterProps[e[t+xe]];return n?Object.assign({},u):u}const s=this.points[e[t+_]].properties,i=this.options.map(s);return n&&i===s?Object.assign({},i):i}}function se(r,e,t){return{type:"Feature",id:r[e+_],properties:Ee(r,e,t),geometry:{type:"Point",coordinates:[Te(r[e]),Ie(r[e+1])]}}}function Ee(r,e,t){const n=r[e+C],s=n>=1e4?`${Math.round(n/1e3)}k`:n>=1e3?`${Math.round(n/100)/10}k`:n,i=r[e+xe],u=i===-1?{}:Object.assign({},t[i]);return Object.assign(u,{cluster:!0,cluster_id:r[e+_],point_count:n,point_count_abbreviated:s})}function j(r){return r/360+.5}function Z(r){const e=Math.sin(r*Math.PI/180),t=.5-.25*Math.log((1+e)/(1-e))/Math.PI;return t<0?0:t>1?1:t}function Te(r){return(r-.5)*360}function Ie(r){const e=(180-r*360)*Math.PI/180;return 360*Math.atan(Math.exp(e))/Math.PI-90}var oe=Object.prototype.hasOwnProperty;function ie(r,e,t){for(t of r.keys())if(z(t,e))return t}function z(r,e){var t,n,s;if(r===e)return!0;if(r&&e&&(t=r.constructor)===e.constructor){if(t===Date)return r.getTime()===e.getTime();if(t===RegExp)return r.toString()===e.toString();if(t===Array){if((n=r.length)===e.length)for(;n--&&z(r[n],e[n]););return n===-1}if(t===Set){if(r.size!==e.size)return!1;for(n of r)if(s=n,s&&typeof s=="object"&&(s=ie(e,s),!s)||!e.has(s))return!1;return!0}if(t===Map){if(r.size!==e.size)return!1;for(n of r)if(s=n[0],s&&typeof s=="object"&&(s=ie(e,s),!s)||!z(n[1],e.get(s)))return!1;return!0}if(t===ArrayBuffer)r=new Uint8Array(r),e=new Uint8Array(e);else if(t===DataView){if((n=r.byteLength)===e.byteLength)for(;n--&&r.getInt8(n)===e.getInt8(n););return n===-1}if(ArrayBuffer.isView(r)){if((n=r.byteLength)===e.byteLength)for(;n--&&r[n]===e[n];);return n===-1}if(!t||typeof r=="object"){n=0;for(t in r)if(oe.call(r,t)&&++n&&!oe.call(e,t)||!(t in e)||!z(r[t],e[t]))return!1;return Object.keys(e).length===n}}return r!==r&&e!==e}function Ne(r){var e=w.useRef(r),t=w.useRef(0);return z(r,e.current)||(e.current=r,t.current+=1),w.useMemo(function(){return e.current},[t.current])}function ke(r,e){return w.useEffect(r,Ne(e))}function Fe(r=google.maps){var e,t,n,s,i,u,p;return p=class extends r.OverlayView{constructor(l){super();L(this,e);L(this,t);L(this,n);L(this,s);L(this,i);L(this,u);P(this,u,!1),this.triggerMouseUp=()=>{r.event.trigger(this.container,"mouseup")},this.onMouseDown=c=>{var a,h,g;E(this,u)||(this.container.style.cursor="grabbing",this.setMapDraggable(!1),E(this,t).prevPxPos={x:c.clientX,y:c.clientY},(h=(a=E(this,t))==null?void 0:a.onDragStart)==null||h.call(a,c,{latlng:A(this.wrappedPosition)}),(g=this.mapDiv)==null||g.addEventListener("mousemove",d=>{var D,b,U;if(!E(this,t).prevPxPos)return;const f=(D=this.getProjection())==null?void 0:D.fromLatLngToDivPixel(this.wrappedPosition);if(!f)return;const m=E(this,t).prevPxPos.x-d.clientX,M=E(this,t).prevPxPos.y-d.clientY,x=new r.Point(f.x-m,f.y-M),v=this.getProjection().fromDivPixelToLatLng(x);P(this,i,A(v)),E(this,t).prevPxPos={x:d.clientX,y:d.clientY},this.draw(),(U=(b=E(this,t))==null?void 0:b.onDrag)==null||U.call(b,d,{latlng:A(v)})}))},this.onMouseUp=c=>{var a,h;E(this,u)||(this.setMapDraggable(!0),this.container.style.cursor="default",P(this,i,this.wrappedPosition),E(this,t).prevPxPos=null,this.draw(),(h=(a=E(this,t))==null?void 0:a.onDragEnd)==null||h.call(a,c,{latlng:A(this.wrappedPosition)}))},P(this,i,l.position),P(this,e,l.pane),P(this,n,l.origin),P(this,s,l.originOffset),this.container=l.container,P(this,t,Object.assign({},l.draggable,{prevPxPos:null}))}get wrappedPosition(){return E(this,i)?E(this,i):A(this.getProjection().fromDivPixelToLatLng(new r.Point(0,0)))}get mapDiv(){var l;return(l=this.getMap())==null?void 0:l.getDiv()}getElement(){return this.container}setMapDraggable(l){var c;(c=this.getMap())==null||c.set("draggable",l)}draw(){const l=this.getProjection();if(!l)return;const c=l.fromLatLngToDivPixel(this.wrappedPosition);if(!c)return;const[a,h]=E(this,s),g=this.container.offsetWidth,d=this.container.offsetHeight;E(this,n)==="bottomCenter"?this.container.style.transform=`translate(${c.x-g/2+a}px, ${c.y-d+h}px)`:this.container.style.transform=`translate(${c.x-g/2+a}px, ${c.y-d/2+h}px)`}onAdd(){var c;P(this,u,!1);const l=this.getPanes();this.container&&l&&(this.container.style.position="absolute",l[E(this,e)].appendChild(this.container)),E(this,t).draggable&&((c=this.mapDiv)==null||c.addEventListener("mouseleave",this.triggerMouseUp),this.container.addEventListener("mousedown",this.onMouseDown),this.container.addEventListener("mouseup",this.onMouseUp))}onRemove(){var c;if(this.setMapDraggable(!0),P(this,u,!0),E(this,t).draggable)try{(c=this.mapDiv)==null||c.removeEventListener("mouseleave",this.triggerMouseUp),this.container.removeEventListener("mousedown",this.onMouseDown),this.container.removeEventListener("mouseup",this.onMouseUp)}catch{}const l=this.container;l&&l.parentNode&&(r.event.clearInstanceListeners(l),l.parentNode.removeChild(l))}},e=new WeakMap,t=new WeakMap,n=new WeakMap,s=new WeakMap,i=new WeakMap,u=new WeakMap,p}let q=null;function Re(r=google.maps){return q||(q=Fe(r)),q}const ze=r=>{const{className:e,pane:t="overlayMouseTarget",position:n,zIndex:s,children:i,origin:u="center",originOffset:p=[0,0],draggable:o=!1,onDrag:l,onDragStart:c,onDragEnd:a,clickable:h,onClick:g}=r,{map:d,maps:f}=Le(),m=Be([t,e].filter(Boolean).join(" ")),M=Re(f);return w.useEffect(()=>{const x=new M({container:m,position:n,pane:t,origin:u,originOffset:p,draggable:{draggable:o,onDrag:l,onDragStart:c,onDragEnd:a}});x.setMap(d),x.getElement().style.zIndex=typeof s=="number"?String(s):s??"0";const v=[];return h&&g&&v.push(f.event.addListener(x,"click",g)),()=>{x.setMap(null),v.forEach(D=>f.event.removeListener(D))}},[m,n,u,p,o,t,s,h]),m?be.createPortal(y.createElement(y.Fragment,null,i),m):null};function Be(r){return w.useMemo(()=>Ce({className:r}),[r])}const B=r=>{if(!y.isValidElement(r.children))return null;const{lat:e,lng:t,originOffset:n=[0,0],...s}=r,i=w.useMemo(()=>({lat:e,lng:t}),[e,t]),u=H.isNumber(n)?[n,n]:n;return y.createElement(ze,{pane:"floatPane",position:i,originOffset:u,...s},r.children)};B.__docgenInfo={description:"Display custom marker on map",methods:[],displayName:"Marker",props:{lat:{required:!0,tsType:{name:"number"},description:"latitude"},lng:{required:!0,tsType:{name:"number"},description:"longitude"},zIndex:{required:!1,tsType:{name:"number"},description:"z-index"},origin:{required:!1,tsType:{name:"union",raw:"'center' | 'bottomCenter'",elements:[{name:"literal",value:"'center'"},{name:"literal",value:"'bottomCenter'"}]},description:"marker origin"},originOffset:{required:!1,tsType:{name:"union",raw:"number | OverlayViewOriginOffset",elements:[{name:"number"},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:"marker origin offset"},children:{required:!1,tsType:{name:"ReactNode"},description:"your custom marker element"},draggable:{required:!1,tsType:{name:"boolean"},description:"if set true, element is draggable"}}};function ve(r){return t=>{const n={...H.omit(t,"children")};return y.createElement(B,{...n},y.createElement(r,{...t}))}}const K=r=>y.createElement("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1488",width:r.width||28,height:r.height||28},y.createElement("path",{d:"M787.7 339.7C787.7 187.4 664.3 64 512 64c-152.3 0-275.7 123.4-275.7 275.7 0 50.3 13.7 97.2 37.2 137.8h-0.3L512 960l238.9-482.5h-0.3c23.5-40.6 37.1-87.5 37.1-137.8M512 477.5c-76.1 0-137.8-61.7-137.8-137.8 0-76.1 61.7-137.8 137.8-137.8 76.2 0 137.8 61.8 137.8 137.8 0.1 76.1-61.6 137.8-137.8 137.8",fill:"#982414","p-id":"1489"}));K.__docgenInfo={description:"",methods:[],displayName:"PinIcon",props:{width:{required:!1,tsType:{name:"number"},description:""},height:{required:!1,tsType:{name:"number"},description:""}}};const Ue={component:B,args:{lat:22.3193,lng:114.1694,zIndex:0,children:y.createElement(K,null),origin:"bottomCenter",originOffset:[0,6],draggable:!1,onDrag:()=>{},onDragStart:()=>{},onDragEnd:()=>{}}},N={args:{origin:"center"},render(r){return y.createElement(Y,null,y.createElement(B,{...r},y.createElement("div",{className:"w-[20px] h-[20px] rounded-[50%] bg-[#ee0000]"})))}},k={render(){const r=w.useMemo(()=>ve(K),[]);return y.createElement(Y,null,y.createElement(r,{lat:22.3,lng:114.17,origin:"bottomCenter",originOffset:[0,6]}))}},F={args:{draggable:!0},render(r){const[e,t]=w.useState({lat:22.3193,lng:114.1694}),[n,s]=w.useState(!1),i=w.useCallback(()=>{s(!0)},[]),u=w.useCallback((o,l)=>{s(!0),t(l.latlng)},[]),p=w.useCallback((o,l)=>{s(!1),t(l.latlng)},[]);return y.createElement(Y,null,y.createElement(Pe,{position:()=>google.maps.ControlPosition.TOP_LEFT,id:"top-left-panel"},y.createElement("div",{className:"ml-[24px]"},y.createElement("p",{className:"text-[#fff] text-[20px]"},"status: ",n?"dragging":"not dragging"),y.createElement("p",{className:"text-[#fff] text-[20px]"},"current latlng: ",`(${e.lat}, ${e.lng})`))),y.createElement(B,{...r,onDragStart:i,onDrag:u,onDragEnd:p}))}},je=ve(r=>{if(r.isCluster){const n=18+Math.floor(Math.log10(r.pointCount??0))*Math.log2(r.zoom);return y.createElement("div",{style:{width:n,height:n},className:"relative rounded-[50%] bg-radial from-[#d09b9b] to-[#f80202] flex justify-center items-center shadow-[0px_0px_6px_#d09b9b]"},r.pointCount)}return y.createElement("div",{className:"w-[10px] h-[10px] rounded-[50%] bg-[#c82a2a]"})}),R={args:{},render(){const{api:r,ref:e}=_e(Se),[t,n]=w.useState({zoom:0,bounds:[]}),s=w.useRef([]);w.useEffect(()=>{if(!(r!=null&&r.map))return;const c=r.map.addListener("idle",()=>{try{if(!(r!=null&&r.map))return;const a=r.map,h=a.getBounds();if(!h)return;const g=h==null?void 0:h.getNorthEast(),d=h==null?void 0:h.getSouthWest();if(!g||!d)return;const f=[d.lng(),d.lat(),g.lng(),g.lat()];if(!H.isEqual(f,s.current)){const m=a.getZoom()??12;n({zoom:m,bounds:f}),s.current=f}}catch(a){console.error(a)}});return()=>{c.remove()}},[r==null?void 0:r.map]);const[i,u]=w.useState([]),p=w.useMemo(()=>{const c={lat:22.3193,lng:114.1694},a=5;return Array.from({length:1e4},()=>{const d=Number((c.lat+(Math.random()-.5)*a).toFixed(6)),f=Number((c.lng+(Math.random()-.5)*a).toFixed(6));return{lat:d,lng:f}})},[]),o=w.useRef();ke(()=>{if(t){if(!o.current){const c=new Ae;c.load(p.map(a=>({type:"Feature",geometry:{type:"Point",coordinates:[a.lng,a.lat]},properties:{}}))),o.current=c}u(o.current.getClusters(t.bounds,t.zoom))}},[t]);const l=w.useMemo(()=>i.map(c=>{const[a,h]=c.geometry.coordinates;return{key:c.id,lat:h,lng:a,isCluster:c.properties.cluster,pointCount:c.properties.point_count}}),[i]);return y.createElement("div",{className:"w-full h-[600px]"},y.createElement(De,{className:"w-full h-full relative",api:r,containerRef:e},r&&y.createElement(y.Fragment,null,l.map(c=>y.createElement(je,{...c,zoom:(t==null?void 0:t.zoom)??12})))))}};var ae,ce,le;N.parameters={...N.parameters,docs:{...(ae=N.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    origin: 'center'
  },
  render(args) {
    return <ExampleGoogleMap>
        <Marker {...args}>
          <div className="w-[20px] h-[20px] rounded-[50%] bg-[#ee0000]"></div>
        </Marker>
      </ExampleGoogleMap>;
  }
}`,...(le=(ce=N.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};var ue,pe,he;k.parameters={...k.parameters,docs:{...(ue=k.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render() {
    const Pin = useMemo(() => createMarker(PinIcon), []);
    return <ExampleGoogleMap>
        <Pin lat={22.3} lng={114.17} origin="bottomCenter" originOffset={[0, 6]} />
      </ExampleGoogleMap>;
  }
}`,...(he=(pe=k.parameters)==null?void 0:pe.docs)==null?void 0:he.source}}};var ge,de,fe;F.parameters={...F.parameters,docs:{...(ge=F.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
    return <ExampleGoogleMap>
        <Control position={() => google.maps.ControlPosition.TOP_LEFT} id="top-left-panel">
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
      </ExampleGoogleMap>;
  }
}`,...(fe=(de=F.parameters)==null?void 0:de.docs)==null?void 0:fe.source}}};var me,ye,we;R.parameters={...R.parameters,docs:{...(me=R.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {},
  render() {
    const {
      api,
      ref
    } = useGoogleMap(defaultOptions);
    const [mapState, setMapState] = useState<{
      zoom: number;
      bounds: number[];
    }>({
      zoom: 0,
      bounds: []
    });
    const lastMapBounds = useRef<number[]>([]);
    useEffect(() => {
      if (!api?.map) {
        return;
      }
      const listener = api.map.addListener('idle', () => {
        // 检测 bounds 是否移动
        try {
          if (!api?.map) {
            return;
          }
          const map = api.map;
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
    }, [api?.map]);
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
    return <div className="w-full h-[600px]">
        <GoogleMap className="w-full h-full relative" api={api} containerRef={ref}>
          {api && <>
              {coords2Show.map(item => <RedDot {...item} zoom={mapState?.zoom ?? 12} />)}
            </>}
        </GoogleMap>
      </div>;
  }
}`,...(we=(ye=R.parameters)==null?void 0:ye.docs)==null?void 0:we.source}}};const Ze=["WrappedWithMarker","CreateMarkerHOC","DraggableMarker","MarkerCluster"],Ye=Object.freeze(Object.defineProperty({__proto__:null,CreateMarkerHOC:k,DraggableMarker:F,MarkerCluster:R,WrappedWithMarker:N,__namedExportsOrder:Ze,default:Ue},Symbol.toStringTag,{value:"Module"}));export{Ye as M,R as a};
