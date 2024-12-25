import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CvfG-kFK.mjs';
import { manifest } from './manifest_CWa-8Vjk.mjs';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/chao2024.astro.mjs');
const _page2 = () => import('./pages/live.astro.mjs');
const _page3 = () => import('./pages/watch.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/chao2024.astro", _page1],
    ["src/pages/live.astro", _page2],
    ["src/pages/watch.astro", _page3],
    ["src/pages/index.astro", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "5b405c67-de63-48da-899c-4b32848d8a1c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
