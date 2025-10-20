import{r as d,j as e,L as s}from"./index-Coke0nAI.js";import{c,B as r}from"./createLucideIcon-CNxtfhBc.js";import{u as l}from"./useThemeStore-C9wODLBM.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],m=c("aperture",h);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],p=c("house",k);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],x=c("moon",u);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],y=c("sun",g);function v(){const{theme:o,setTheme:a}=l();d.useEffect(()=>{const t=localStorage.getItem("theme");if(t)a(t),document.documentElement.classList.toggle("dark",t==="dark");else{const n=window.matchMedia("(prefers-color-scheme: dark)").matches;a(n?"dark":"light"),document.documentElement.classList.toggle("dark",n)}},[a]);const i=()=>{const t=o==="light"?"dark":"light";a(t),localStorage.setItem("theme",t),document.documentElement.classList.toggle("dark",t==="dark")};return e.jsx("button",{onClick:i,className:"place-items-center rounded-2xl size-8  shadow-md transition hover:scale-105 hover:bg-zinc-200 dark:hover:bg-zinc-700",title:"theme switcher",children:o==="light"?e.jsx(x,{className:"h-5 w-5 text-zinc-500 dark:text-zinc-800'"}):e.jsx(y,{className:"h-5 w-5 text-yellow-400"})})}function f(){return e.jsx("header",{className:"sticky top-0 z-50 flex justify-end items-center w-full h-16 bg-background px-4",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(s,{title:"dashboard",to:"/",className:"place-items-center block pt-1.5 rounded-2xl size-8  shadow-md transition hover:scale-105 hover:bg-zinc-200 dark:hover:bg-zinc-700",children:e.jsx(p,{className:"h-5 w-5 text-violet-500 dark:text-zinc-800'"})}),e.jsx(s,{title:"about",to:"/about",className:"place-items-center block pt-1.5 rounded-2xl size-8  shadow-md transition hover:scale-105 hover:bg-zinc-200 dark:hover:bg-zinc-700",children:e.jsx(m,{className:"h-5 w-5 text-pink-500 dark:text-zinc-800'"})}),e.jsx(v,{}),e.jsx(s,{to:"/login",children:e.jsx(r,{variant:"default",children:"Sign In"})}),e.jsx(s,{to:"/register",children:e.jsx(r,{variant:"outline",children:"Register"})})]})})}export{f as A,v as T};
