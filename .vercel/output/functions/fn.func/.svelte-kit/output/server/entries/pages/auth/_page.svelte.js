import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { I as Icon } from "../../../chunks/Icon.js";
const css = {
  code: ".img-bg.svelte-ji45df{height:16rem;width:16rem}@media(min-width: 768px){.img-bg.svelte-ji45df{height:20rem;width:20rem}}.img-animation.svelte-ji45df{position:absolute;z-index:-1;border-radius:9999px;--tw-blur:blur(50px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;animation:svelte-ji45df-pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,\r\n			svelte-ji45df-glow 5s linear infinite}@keyframes svelte-ji45df-glow{0%{background-color:rgb(var(--color-primary-400) / 0.5)}33%{background-color:rgb(var(--color-secondary-400) / 0.5)}66%{background-color:rgb(var(--color-tertiary-400) / 0.5)}100%{background-color:rgb(var(--color-primary-400) / 0.5)}}@keyframes svelte-ji45df-pulse{50%{transform:scale(1.5)}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="container h-full mx-auto flex justify-center items-center"><div class="space-y-10 text-center flex flex-col items-center"><h2 class="h2" data-svelte-h="svelte-1xprfm4">Willkommen bei <span class="h1 pixeled text-primary-500">AnoAsked</span></h2>  <figure class="flex relative flex-col" data-svelte-h="svelte-q2rwgh"><section class="img-bg img-animation svelte-ji45df"></section> <img src="/favicon.svg" alt="AnoAsked Logo" class="img-bg svelte-ji45df"></figure>  <div class="flex flex-col justify-center space-y-2"><a type="button" class="btn btn-md variant-ghost-success" href="/auth/login">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:verified", class: "w-6 h-6" }, {}, {})} <span data-svelte-h="svelte-1673q28">Verifiziert fortfahren</span></a> <a type="button" class="btn btn-md variant-ghost-error" href="/app">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:anonymous", class: "w-6 h-6" }, {}, {})} <span data-svelte-h="svelte-14n0auh">Anonym fortfahren</span></a></div></div> </div>`;
});
export {
  Page as default
};
