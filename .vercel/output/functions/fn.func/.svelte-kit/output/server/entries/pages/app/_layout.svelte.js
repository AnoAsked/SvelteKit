import { c as create_ssr_component, k as subscribe } from "../../../chunks/ssr.js";
import { b as browser } from "../../../chunks/index3.js";
import { g as goto } from "../../../chunks/client.js";
import { u as username, a as user } from "../../../chunks/auth.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $username, $$unsubscribe_username;
  $$unsubscribe_username = subscribe(username, (value) => $username = value);
  {
    if (!$username && browser)
      goto();
  }
  $$unsubscribe_username();
  return `${$username && browser && user.is ? `${slots.default ? slots.default({}) : ``}` : ``}`;
});
export {
  Layout as default
};
