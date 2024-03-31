

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.C6bbFX88.js","_app/immutable/chunks/scheduler.BKpD4Ueu.js","_app/immutable/chunks/index.X07mLS8L.js","_app/immutable/chunks/entry.BP7SI6wp.js","_app/immutable/chunks/Icon.C26g9MXi.js"];
export const stylesheets = ["_app/immutable/assets/app.B_yMt8zk.css"];
export const fonts = [];
