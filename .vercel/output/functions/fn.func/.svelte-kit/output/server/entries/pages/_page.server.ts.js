import { r as redirect } from "../../chunks/index.js";
const load = async () => {
  return redirect(308, "/auth");
};
export {
  load
};
