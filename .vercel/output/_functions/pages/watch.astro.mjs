/* empty css                                    */
import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_D0OqohAt.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C2pXXB63.mjs';
import { s as supabase } from '../chunks/supabase_DpKgg8ib.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Card, CardHeader, Divider, CardBody } from '@nextui-org/react';
export { renderers } from '../renderers.mjs';

const StreamGrid = ({ events }) => {
  const [streams, setStreams] = useState([]);
  useState(null);
  useEffect(() => {
    setStreams(events);
    const interval = setInterval(() => {
      setStreams(events);
    }, 1e4);
    return () => clearInterval(interval);
  }, [events]);
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-white mb-8 text-center", children: "Live Streams" }),
    streams.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: streams.map((stream) => /* @__PURE__ */ jsxs(
      Card,
      {
        className: "bg-zinc-900/50 backdrop-blur-sm border border-zinc-800",
        children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-col gap-1 px-4 pt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-white", children: stream.country }),
              /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs bg-red-500 text-white rounded-full", children: "LIVE" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-zinc-400 text-sm", children: stream.title })
          ] }),
          /* @__PURE__ */ jsx(Divider, { className: "my-4 bg-zinc-800" }),
          /* @__PURE__ */ jsx(CardBody, { className: "overflow-visible p-0", children: /* @__PURE__ */ jsx("div", { className: "relative pt-[56.25%]", children: /* @__PURE__ */ jsx(
            "iframe",
            {
              className: "absolute top-0 left-0 w-full h-full rounded-b-lg",
              src: stream.link,
              title: stream.title,
              frameBorder: "0",
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
              allowFullScreen: true,
              sandbox: "allow-scripts allow-same-origin allow-presentation"
            }
          ) }) })
        ]
      },
      stream.id
    )) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "Loading streams..." })
    ] })
  ] });
};

const $$Stream = createComponent(async ($$result, $$props, $$slots) => {
  const { data, error } = await supabase.from("live").select("*");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "StreamGrid", StreamGrid, { "events": data ?? [], "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/components/react/StreamGrid", "client:component-export": "default" })} </main> ` })}`;
}, "C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/components/Stream.astro", void 0);

const $$Watch = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Stream", $$Stream, {})} ` })}`;
}, "C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/pages/watch.astro", void 0);

const $$file = "C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/pages/watch.astro";
const $$url = "/watch";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Watch,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
