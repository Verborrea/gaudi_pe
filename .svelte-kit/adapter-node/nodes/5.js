

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gracias/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.BlQSlknI.js","_app/immutable/chunks/scheduler.DKRIXM0x.js","_app/immutable/chunks/index.C8C-eI0O.js"];
export const stylesheets = ["_app/immutable/assets/5.CDX1tqOz.css"];
export const fonts = [];
