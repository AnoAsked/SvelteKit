import { n as getContext, c as create_ssr_component, k as subscribe, e as escape, v as validate_component } from "../../chunks/ssr.js";
import "../../chunks/client.js";
import { I as Icon } from "../../chunks/Icon.js";
/* empty css               */
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="container h-full mx-auto flex justify-center items-center"><div class="text-center flex flex-col items-center"><h1 class="h1 text-9xl pixeled text-primary-500">${escape($page.status)}</h1> <h3 class="h3 font-semibold">${escape($page.error?.message)}</h3> <a class="btn btn-md variant-ghost-surface mt-32" href="/">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:arrow-back", class: "w-6 h-6" }, {}, {})} <span data-svelte-h="svelte-107q5pv">Zurück</span></a></div></div>`;
});
export {
  Error$1 as default
};
