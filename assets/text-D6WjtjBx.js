import{r as i,j as t}from"./index-Coke0nAI.js";import{T as c}from"./toggle-CjYhzbyD.js";import{c as o}from"./createLucideIcon-CNxtfhBc.js";import"./sidebar-BzK-oMkL.js";import"./useBaseQuery-CQeARSMF.js";import"./schemas-DHehp46N.js";import"./index-DzwLIVv3.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",key:"mg9rjx"}]],r=o("bold",d);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]],m=o("code",s);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"m9 11-6 6v3h9l3-3",key:"1a3l36"}],["path",{d:"m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4",key:"14a9rk"}]],h=o("highlighter",g);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["line",{x1:"19",x2:"10",y1:"4",y2:"4",key:"15jd3p"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20",key:"bu0au3"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20",key:"uljnxc"}]],y=o("italic",p);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M16 4H9a3 3 0 0 0-2.83 4",key:"43sutm"}],["path",{d:"M14 12a4 4 0 0 1 0 8H6",key:"nlfj13"}],["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}]],x=o("strikethrough",k);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M6 4v6a6 6 0 0 0 12 0V4",key:"9kb039"}],["line",{x1:"4",x2:"20",y1:"20",y2:"20",key:"nun2al"}]],b=o("underline",u);function M({editor:n}){const l=[{label:"bold",command:"toggleBold",icon:r},{label:"italic",command:"toggleItalic",icon:y},{label:"underline",command:"toggleUnderline",icon:b},{label:"strike-through",command:"toggleStrike",icon:x},{label:"code",command:"toggleCode",icon:m},{label:"highlight",command:"toggleHighlight",icon:h}],a=i.useCallback(e=>()=>{n.chain().focus()[e]().run()},[n]);return t.jsx(t.Fragment,{children:l.map(e=>t.jsx(c,{pressed:n.isActive(e.label),onPressedChange:a(e.command),className:"size-7",title:e.label,children:t.jsx(e.icon,{})},e.label))})}export{M as default};
