/* empty css                                    */
import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_D0OqohAt.mjs';
import 'kleur/colors';
import { Button } from '@nextui-org/react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useMemo, useEffect } from 'react';
import { $ as $$Layout } from '../chunks/Layout_C2pXXB63.mjs';
import { C as CURRENT_YEAR } from '../chunks/constants_WFi4ioVo.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const Countdown = () => {
  const [now, setNow] = useState(() => Date.now());
  const year = useMemo(() => (/* @__PURE__ */ new Date()).getFullYear(), []);
  const targetDate = useMemo(
    () => new Date(Date.UTC(year, 11, 31, 10)).getTime(),
    [year]
  );
  const timeLeft = useMemo(() => {
    const gap = targetDate - now;
    const second = 1e3;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    return {
      days: Math.max(0, Math.floor(gap / day)),
      hours: Math.max(0, Math.floor(gap % day / hour)),
      minutes: Math.max(0, Math.floor(gap % hour / minute)),
      seconds: Math.max(0, Math.floor(gap % minute / second))
    };
  }, [now, targetDate]);
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(interval);
  }, []);
  const timeUnits = useMemo(
    () => ["days", "hours", "minutes", "seconds"],
    []
  );
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8", children: timeUnits.map((unit) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-3", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-6 shadow-xl backdrop-blur-sm border border-zinc-800 hover:scale-105 transition-all duration-300", children: /* @__PURE__ */ jsx("span", { className: "text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent", children: timeLeft[unit].toString().padStart(2, "0") }) }),
    /* @__PURE__ */ jsx("span", { className: "text-sm md:text-base uppercase font-medium text-zinc-400 tracking-wider", children: unit })
  ] }, unit)) });
};

const $$Chao2024 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-pwvlrrkd": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen flex items-center justify-center" data-astro-cid-pwvlrrkd> <div class="text-center space-y-12 px-4 animate-fade-in" data-astro-cid-pwvlrrkd> <h1 class="text-6xl md:text-8xl font-medium tracking-tighter" data-astro-cid-pwvlrrkd>
#Chao<span class="text-red-500" data-astro-cid-pwvlrrkd>${CURRENT_YEAR}</span> </h1> <div class="max-w-4xl mx-auto" data-astro-cid-pwvlrrkd> ${renderComponent($$result2, "Countdown", Countdown, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/components/react/Countdown", "client:component-export": "default", "data-astro-cid-pwvlrrkd": true })} </div> ${renderComponent($$result2, "Button", Button, { "color": "default", "variant": "shadow", "size": "lg", "className": "text-xl hover:scale-105 transition-transform", "data-astro-cid-pwvlrrkd": true }, { "default": ($$result3) => renderTemplate` <a href="/" data-astro-cid-pwvlrrkd>#${CURRENT_YEAR + 1}Live</a> ` })} </div> </main> ` })} `;
}, "C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/pages/chao2024.astro", void 0);

const $$file = "C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/pages/chao2024.astro";
const $$url = "/chao2024";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Chao2024,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
