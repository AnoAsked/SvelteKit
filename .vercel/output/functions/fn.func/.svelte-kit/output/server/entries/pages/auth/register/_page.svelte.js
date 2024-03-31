import { c as create_ssr_component, b as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/auth.js";
import { g as getToastStore } from "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import "../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getToastStore();
  let username;
  let password;
  return `<div class="container h-full mx-auto flex justify-center items-center"><div class="space-y-10 text-center flex flex-col items-center"><h2 class="h2" data-svelte-h="svelte-rq2sbk">Bei <span class="h1 pixeled text-primary-500">AnoAsked</span> registrieren</h2> <form class="space-y-6"><div class="flex flex-col justify-center space-y-2 w-80"><div class="input-group input-group-divider grid-cols-[1fr_auto]"><input type="text" minlength="3" maxlength="16" placeholder="Benutzername definieren..."${add_attribute("value", username, 0)}> <div>${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:user", class: "w-6 h-6" }, {}, {})}</div></div> <div class="input-group input-group-divider grid-cols-[1fr_auto]"><input type="password" placeholder="Passwort definieren..."${add_attribute("value", password, 0)}> <div>${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:password", class: "w-6 h-6" }, {}, {})}</div></div> <div class="input-group input-group-divider grid-cols-[1fr_auto]"><input type="password" placeholder="Passwort wiederholen..."> <div>${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:reload", class: "w-6 h-6" }, {}, {})}</div></div></div> <button type="submit" class="btn btn-md variant-ghost-success">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:register", class: "w-6 h-6" }, {}, {})} <span data-svelte-h="svelte-sjmj35">Registrieren</span></button></form> <div class="flex justify-center items-center space-x-2"><a class="btn btn-md variant-ghost-surface w-min" href="/auth">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:arrow-back", class: "w-6 h-6" }, {}, {})} <span data-svelte-h="svelte-107q5pv">Zurück</span></a> <a type="button" class="btn btn-md variant-ghost" href="/auth/login">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:login", class: "w-6 h-6" }, {}, {})} <span data-svelte-h="svelte-49q66s">Anmelden</span></a></div></div></div>`;
});
export {
  Page as default
};
