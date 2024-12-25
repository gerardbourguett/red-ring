import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DGgWMxxD.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_D0OqohAt.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"inline","content":"[data-astro-image]{width:100%;height:auto;-o-object-fit:var(--fit);object-fit:var(--fit);-o-object-position:var(--pos);object-position:var(--pos);aspect-ratio:var(--w) / var(--h)}[data-astro-image=responsive]{max-width:calc(var(--w) * 1px);max-height:calc(var(--h) * 1px)}[data-astro-image=fixed]{width:calc(var(--w) * 1px);height:calc(var(--h) * 1px)}\n"}],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/chao2024.B7tTMh_F.css"},{"type":"inline","content":"html{background:#000;scrollbar-gutter:stable}body{margin:0;padding:0;min-height:100vh}\n@keyframes fadeIn{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-fade-in[data-astro-cid-pwvlrrkd]{animation:fadeIn .6s ease-out}\n"}],"routeData":{"route":"/chao2024","isIndex":false,"type":"page","pattern":"^\\/chao2024\\/?$","segments":[[{"content":"chao2024","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/chao2024.astro","pathname":"/chao2024","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/chao2024.B7tTMh_F.css"},{"type":"inline","content":"html{background:#000;scrollbar-gutter:stable}body{margin:0;padding:0;min-height:100vh}\n"}],"routeData":{"route":"/live","isIndex":false,"type":"page","pattern":"^\\/live\\/?$","segments":[[{"content":"live","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/live.astro","pathname":"/live","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/chao2024.B7tTMh_F.css"},{"type":"inline","content":"html{background:#000;scrollbar-gutter:stable}body{margin:0;padding:0;min-height:100vh}\n"}],"routeData":{"route":"/watch","isIndex":false,"type":"page","pattern":"^\\/watch\\/?$","segments":[[{"content":"watch","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/watch.astro","pathname":"/watch","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/chao2024.B7tTMh_F.css"},{"type":"inline","content":"html{background:#000;scrollbar-gutter:stable}body{margin:0;padding:0;min-height:100vh}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/pages/watch.astro",{"propagation":"none","containsHead":true}],["C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/pages/chao2024.astro",{"propagation":"none","containsHead":true}],["C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/pages/live.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/chao2024@_@astro":"pages/chao2024.astro.mjs","\u0000@astro-page:src/pages/live@_@astro":"pages/live.astro.mjs","\u0000@astro-page:src/pages/watch@_@astro":"pages/watch.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DquuAolL.mjs","\u0000@astrojs-manifest":"manifest_CWa-8Vjk.mjs","C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/components/react/Countdown":"_astro/Countdown.B3rdQoNK.js","C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/components/react/NyeEvents":"_astro/NyeEvents.KwbTZsRK.js","C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/components/react/StreamGrid":"_astro/StreamGrid.BU2Wxsw3.js","C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/components/react/TimeProgress":"_astro/TimeProgress.BQZOznWb.js","C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/components/react/WorldMap":"_astro/WorldMap.BMcyw0x2.js","@astrojs/react/client.js":"_astro/client.DBitNm8r.js","C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/node_modules/@nextui-org/dom-animation/dist/index.mjs":"_astro/index.Dfwy_aMB.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/chao2024.B7tTMh_F.css","/favicon.svg","/_astro/chunk-44JHHBS2.Bnr1vR3H.js","/_astro/client.DBitNm8r.js","/_astro/Countdown.B3rdQoNK.js","/_astro/index.BpHcQvXT.js","/_astro/index.Dfwy_aMB.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/NyeEvents.KwbTZsRK.js","/_astro/StreamGrid.BU2Wxsw3.js","/_astro/TimeProgress.BQZOznWb.js","/_astro/WorldMap.BMcyw0x2.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"6P2gLQi6jfpLf2Dk0rxNQwGkoZroEG7e+v8TJEARQyw="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
