import * as universal from '../entries/pages/tienda/_id_/_page.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tienda/_id_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/tienda/[id]/+page.js";
export const imports = ["_app/immutable/nodes/8.BL7C7p8k.js","_app/immutable/chunks/index.CzR0xuCU.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/scheduler.DxlGDd7X.js","_app/immutable/chunks/index.BwqU91H_.js","_app/immutable/chunks/each.BH6mmzmq.js","_app/immutable/chunks/index.FJJMNGYt.js","_app/immutable/chunks/Product.z5uw8hAw.js","_app/immutable/chunks/stores.Dlay_oK_.js","_app/immutable/chunks/index.DYpupPmn.js"];
export const stylesheets = ["_app/immutable/assets/8.aWeLqdCy.css","_app/immutable/assets/Product.HpvcPrUy.css"];
export const fonts = [];
