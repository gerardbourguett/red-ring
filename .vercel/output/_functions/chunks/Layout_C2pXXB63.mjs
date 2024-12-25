import { c as createComponent, r as renderTemplate, a as addAttribute, b as renderHead, d as renderSlot, e as createAstro } from './astro/server_D0OqohAt.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>New Year Countdown</title>${renderHead()}</head> <body> <div class="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white antialiased"> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"> ${renderSlot($$result, $$slots["default"])} </div> </div> </body></html>`;
}, "C:/Users/gabc_/OneDrive/Documentos/astro/red-ring/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
