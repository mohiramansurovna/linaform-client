const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/image-dialog-C0opS3M3.js","assets/index-Tjubhkso.js","assets/index-BQCFgjAZ.css","assets/schemas-Dvu2-DyR.js","assets/link-dialog-CjY3MbVf.js","assets/label-CHplxwBf.js","assets/index-Ew0qOuiv.js","assets/index-pZb4YAyi.js","assets/normalize-colors-D8t22BnB.js","assets/useNoteMutations-DVPRVQWg.js","assets/sidebar-BSceTEqa.js","assets/check-check-BOErKGq4.js","assets/loader-circle-BSKw3M_d.js","assets/useThemeStore-jxpwotcg.js","assets/loading-DJeh0sh_.js","assets/loader-pQ3URqtq.js"])))=>i.map(i=>d[i]);
import{c as l,R as i,j as a,r as c,_ as o}from"./index-Tjubhkso.js";import{T as d}from"./toggle-DoqiMmKW.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],u=l("image",k);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]],x=l("link",_),h=c.lazy(()=>o(()=>import("./image-dialog-C0opS3M3.js"),__vite__mapDeps([0,1,2,3]))),f=c.lazy(()=>o(()=>import("./link-dialog-CjY3MbVf.js"),__vite__mapDeps([4,1,2,3,5,6,7,8,9,10,11,12,13,14,15])));function j({editor:e}){const[r,s]=i.useState(!1),[g,n]=i.useState(!1),m=[{onclick:()=>s(!0),icon:u,label:"Insert Image",pressed:e.isActive("image")},{icon:x,onclick:()=>n(!0),label:"Insert Link",pressed:e.isActive("link")}];return a.jsxs(a.Fragment,{children:[m.map((t,p)=>a.jsx(d,{title:t.label,pressed:t.pressed,onPressedChange:t.onclick,children:a.jsx(t.icon,{})},p)),a.jsx(h,{open:r,onOpenChange:s,editor:e}),a.jsx(f,{open:g,onOpenChange:n,defaultValue:{url:e.getAttributes("link").href||"",color:e.getAttributes("link").class?.match(/text-(\w+)-500/)?.[1]||"blue",underline:e.isActive("underline")}})]})}export{j as default};
