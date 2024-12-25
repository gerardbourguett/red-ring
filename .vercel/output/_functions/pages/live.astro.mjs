/* empty css                                    */
import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_D0OqohAt.mjs';
import 'kleur/colors';
import { Divider, Link, Button } from '@nextui-org/react';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import CountryFlag from 'react-country-flag';
import { $ as $$Layout } from '../chunks/Layout_C2pXXB63.mjs';
import { C as CURRENT_YEAR } from '../chunks/constants_WFi4ioVo.mjs';
import { s as supabase } from '../chunks/supabase_DpKgg8ib.mjs';
export { renderers } from '../renderers.mjs';

const NyeEvents = ({ events }) => {
  const [localTime, setLocalTime] = useState("");
  const [closest, setClosest] = useState([]);
  const [nextGroup, setNextGroup] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAndFilterData = async () => {
      const currentUTC = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
      const targetDate = /* @__PURE__ */ new Date();
      targetDate.setUTCDate(targetDate.getUTCDate() + 1);
      targetDate.setUTCHours(0, 0, 0, 0);
      const targetTimestamp = Math.floor(targetDate.getTime() / 1e3);
      const dataWithDifference = events.map((row) => {
        const localTimestamp = currentUTC + row.gmt_offset;
        const secondsToTarget = targetTimestamp - localTimestamp;
        return { ...row, secondsToTarget };
      });
      const sortedData = dataWithDifference.filter((row) => row.secondsToTarget > 0).sort((a, b) => a.secondsToTarget - b.secondsToTarget);
      const closestGroup = sortedData.filter(
        (row) => row.secondsToTarget === sortedData[0].secondsToTarget
      );
      const nextGroup2 = sortedData.filter(
        (row) => row.secondsToTarget > sortedData[0].secondsToTarget && row.secondsToTarget <= Math.min(
          ...sortedData.filter(
            (item) => item.secondsToTarget > sortedData[0].secondsToTarget
          ).map((item) => item.secondsToTarget)
        )
      );
      setClosest(closestGroup);
      setNextGroup(nextGroup2);
      setLoading(false);
      if (closestGroup.length > 0) {
        const firstItem = closestGroup[0];
        const localTimestamp = currentUTC + firstItem.gmt_offset;
        const localDate = new Date(localTimestamp * 1e3);
        const year = localDate.getUTCFullYear();
        const month = (localDate.getUTCMonth() + 1).toString().padStart(2, "0");
        const day = localDate.getUTCDate().toString().padStart(2, "0");
        const hours = localDate.getUTCHours().toString().padStart(2, "0");
        const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
        const seconds = localDate.getUTCSeconds().toString().padStart(2, "0");
        const gmtOffsetHours = firstItem.gmt_offset / 3600;
        const gmtSign = gmtOffsetHours >= 0 ? "+" : "-";
        const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} GMT${gmtSign}${Math.abs(
          gmtOffsetHours
        )}`;
        setLocalTime(formattedTime);
      }
    };
    fetchAndFilterData();
    const interval = setInterval(fetchAndFilterData, 1e3);
    return () => clearInterval(interval);
  }, []);
  const renderCards = (data) => {
    return data.map((item, index) => /* @__PURE__ */ jsxs(
      Card,
      {
        className: "bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm hover:bg-zinc-900/80 transition-all duration-300",
        children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "flex justify-center p-6", children: /* @__PURE__ */ jsx(
            CountryFlag,
            {
              countryCode: item.country_code,
              svg: true,
              style: { fontSize: 64 },
              title: item.country_name,
              alt: item.country_name
            }
          ) }),
          /* @__PURE__ */ jsx(Divider, { className: "bg-zinc-800" }),
          /* @__PURE__ */ jsxs(CardBody, { className: "text-center p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-white mb-1", children: item.country_name }),
            /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: item.city })
          ] }),
          /* @__PURE__ */ jsx(CardFooter, { className: "justify-center pb-6", children: item.stream && /* @__PURE__ */ jsx(Link, { isExternal: true, href: item.stream, children: /* @__PURE__ */ jsx(
            Button,
            {
              color: "danger",
              size: "sm",
              variant: "shadow",
              className: "hover:scale-105 transition-transform",
              children: /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs bg-red-500 text-white rounded-full", children: "LIVE" })
            }
          ) }) })
        ]
      },
      index
    ));
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 rounded-2xl border border-zinc-800", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-zinc-400 uppercase tracking-wider text-sm", children: "Current Timezone Time" }),
      /* @__PURE__ */ jsx("p", { className: "text-5xl md:text-6xl font-bold text-red-500 font-mono", children: localTime })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-2", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white", children: "Next Timezones Celebrating New Year's Eve" }),
      /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "Stay tuned for celebrations around the world" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-red-500", children: "Closest to Midnight" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: renderCards(closest) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-red-500", children: "Next Up" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: renderCards(nextGroup) })
    ] })
  ] });
};

const $$Live = createComponent(async ($$result, $$props, $$slots) => {
  const { data, error } = await supabase.from("timezones").select("*");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4"> <h1 class="text-6xl md:text-7xl font-medium tracking-tight text-center">
#RoadTo<span class="text-red-600">2025</span> </h1> <div class="mt-16"> ${renderComponent($$result2, "NyeEvents", NyeEvents, { "events": data ?? [], "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/components/react/NyeEvents", "client:component-export": "default" })} </div> ${renderComponent($$result2, "Button", Button, { "color": "default", "variant": "shadow", "size": "lg", "className": "text-xl hover:scale-105 transition-transform" }, { "default": ($$result3) => renderTemplate` <a href="/">#${CURRENT_YEAR + 1}Live</a> ` })} </div> ` })}`;
}, "C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/pages/live.astro", void 0);

const $$file = "C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/pages/live.astro";
const $$url = "/live";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Live,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
