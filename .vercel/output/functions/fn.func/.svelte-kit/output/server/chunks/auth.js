import { w as writable } from "./index2.js";
import Gun from "gun";
import "gun/sea.js";
import "gun/axe.js";
const db = new Gun();
const user = db.user().recall({ sessionStorage: true });
const username = writable("");
user.get("alias").on((v) => username.set(v));
db.on("auth", async (event) => {
  const alias = await user.get("alias");
  username.set(alias);
});
export {
  user as a,
  username as u
};
