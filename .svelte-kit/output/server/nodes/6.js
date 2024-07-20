import * as universal from '../entries/pages/mapa/_page.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mapa/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/mapa/+page.js";
export const imports = ["_app/immutable/nodes/6.CGfc6QAO.js","_app/immutable/chunks/index.CzR0xuCU.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/scheduler.DxlGDd7X.js","_app/immutable/chunks/index.BwqU91H_.js","_app/immutable/chunks/stores.DviNO9QF.js","_app/immutable/chunks/index.DYpupPmn.js"];
export const stylesheets = ["_app/immutable/assets/6.DPHzdFyO.css"];
export const fonts = [];
