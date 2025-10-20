const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/image-dialog-BxtnqAAT.js","assets/index-Coke0nAI.js","assets/index-DD7TmI1W.css","assets/dialog-ClRiNiXy.js","assets/sidebar-BzK-oMkL.js","assets/useBaseQuery-CQeARSMF.js","assets/createLucideIcon-CNxtfhBc.js","assets/schemas-DHehp46N.js","assets/index-DzwLIVv3.js","assets/link-dialog-DPjfeJvV.js","assets/label-B7Gy5C_i.js"])))=>i.map(i=>d[i]);
import{R as n,j as t,r as o,_ as l}from"./index-Coke0nAI.js";import{T as k}from"./toggle-CjYhzbyD.js";import{c as r}from"./createLucideIcon-CNxtfhBc.js";import"./sidebar-BzK-oMkL.js";import"./useBaseQuery-CQeARSMF.js";import"./schemas-DHehp46N.js";import"./index-DzwLIVv3.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],_=r("image",u);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]],x=r("link",d),h=o.lazy(()=>l(()=>import("./image-dialog-BxtnqAAT.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8]))),f=o.lazy(()=>l(()=>import("./link-dialog-DPjfeJvV.js"),__vite__mapDeps([9,1,2,3,4,5,6,7,8,10])));function E({editor:e}){const[c,s]=n.useState(!1),[m,i]=n.useState(!1),g=[{onclick:()=>s(!0),icon:_,label:"Insert Image",pressed:e.isActive("image")},{icon:x,onclick:()=>i(!0),label:"Insert Link",pressed:e.isActive("link")}];return t.jsxs(t.Fragment,{children:[g.map((a,p)=>t.jsx(k,{title:a.label,pressed:a.pressed,onPressedChange:a.onclick,children:t.jsx(a.icon,{})},p)),t.jsx(h,{open:c,onOpenChange:s,editor:e}),t.jsx(f,{open:m,onOpenChange:i,editor:e,defaultValue:{url:e.getAttributes("link").href||"",color:e.getAttributes("link").class?.match(/text-(\w+)-500/)?.[1]||"blue",underline:e.isActive("underline")}})]})}export{E as default};
