import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.BdceUBKc.js","_app/immutable/chunks/index.CzR0xuCU.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/scheduler.DxlGDd7X.js","_app/immutable/chunks/index.BwqU91H_.js","_app/immutable/chunks/stores.WzsiYnKf.js","_app/immutable/chunks/entry.DGJm_PfT.js","_app/immutable/chunks/index.DYpupPmn.js","_app/immutable/chunks/stores.DviNO9QF.js","_app/immutable/chunks/each.BH6mmzmq.js"];
export const stylesheets = ["_app/immutable/assets/0.CL2bCs1v.css"];
export const fonts = [];
