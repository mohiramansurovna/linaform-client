import{c as l,R as i,j as e,J as m,K as u,M as x,N as d,L as h,Q as g,B as r}from"./index-BcR0Qb-V.js";import{I as j}from"./schemas-BWUwtsDD.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],f=l("circle-question-mark",p);function k({open:n,onOpenChange:a,editor:t}){const[s,o]=i.useState("");return e.jsx(m,{open:n,onOpenChange:a,children:e.jsxs(u,{children:[e.jsx(x,{children:e.jsx(d,{children:"Insert Link for the Image"})}),e.jsxs(h,{to:"#",className:"text-zinc-600  text-xs hover:underline font-semibold",children:[e.jsx(f,{size:14,className:"inline mr-1"}),"Learn how to insert image urls"]}),e.jsx(j,{type:"url",value:s,onChange:c=>o(c.target.value),placeholder:"https://example.com"}),e.jsxs(g,{children:[e.jsx(r,{variant:"secondary",children:"Cancel"}),e.jsx(r,{onClick:()=>{s&&t&&(t.chain().focus().setImage({src:s}).run(),a(!1))},children:"Insert"})]})]})})}const D=i.memo(k);export{D as default};
