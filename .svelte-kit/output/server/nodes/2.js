

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.Cxz0b7q2.js","_app/immutable/chunks/scheduler.DKRIXM0x.js","_app/immutable/chunks/index.C8C-eI0O.js"];
export const stylesheets = ["_app/immutable/assets/2.BOhQmx04.css"];
export const fonts = [];
