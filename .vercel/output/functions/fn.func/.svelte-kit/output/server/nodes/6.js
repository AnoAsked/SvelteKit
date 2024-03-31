

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/app/home/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.DoQN59n5.js","_app/immutable/chunks/scheduler.BKpD4Ueu.js","_app/immutable/chunks/index.X07mLS8L.js"];
export const stylesheets = [];
export const fonts = [];
