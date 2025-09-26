import{c as o,R as i,j as e,J as m,K as u,M as x,N as d,Q as h,B as r}from"./index-BhFsQ8vH.js";import{I as g}from"./schemas-CsxVtVro.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],p=o("circle-question-mark",j);function f({open:n,onOpenChange:a,editor:t}){const[s,c]=i.useState("");return e.jsx(m,{open:n,onOpenChange:a,children:e.jsxs(u,{children:[e.jsx(x,{children:e.jsx(d,{children:"Insert Link for the Image"})}),e.jsxs("a",{className:"text-zinc-600  text-xs hover:underline font-semibold",children:[e.jsx(p,{size:14,className:"inline mr-1"}),"Learn how to insert image urls"]}),e.jsx(g,{type:"url",value:s,onChange:l=>c(l.target.value),placeholder:"https://example.com"}),e.jsxs(h,{children:[e.jsx(r,{variant:"secondary",children:"Cancel"}),e.jsx(r,{onClick:()=>{s&&t&&(t.chain().focus().setImage({src:s}).run(),a(!1))},children:"Insert"})]})]})})}const y=i.memo(f);export{y as default};
