import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.BpHcQvXT.js";const p=()=>{const[a,l]=n.useState({progress:0}),t=new Date().getFullYear();return n.useEffect(()=>{const i=()=>{const e=new Date(Date.UTC(t,0,1)),s=new Date(Date.UTC(t+1,0,1)),g=(Date.now()-e.getTime())/(s.getTime()-e.getTime())*100;return Math.min(100,Math.max(0,g))},o=()=>{l(e=>{const s=i();return Math.abs(e.progress-s)>1e-5?{progress:s}:e})};o();const c=setInterval(o,1e3);return()=>clearInterval(c)},[t]),r.jsxs("div",{className:"",children:[r.jsx("div",{className:"relative h-4 bg-gray-800 rounded-full overflow-hidden",children:r.jsx("div",{className:"absolute h-full bg-red-500 transition-all duration-500",style:{width:`${a.progress}%`}})}),r.jsxs("p",{className:"text-gray-400 mt-2 text-center",children:[t," Progress: ",a.progress.toFixed(5),"%"]})]})};export{p as default};