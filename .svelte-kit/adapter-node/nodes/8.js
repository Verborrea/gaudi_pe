import * as universal from '../entries/pages/tienda/_id_/_page.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tienda/_id_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/tienda/[id]/+page.js";
export const imports = ["_app/immutable/nodes/8.Ci3M-yfk.js","_app/immutable/chunks/productos.CkYuVUUv.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/scheduler.DKRIXM0x.js","_app/immutable/chunks/index.C8C-eI0O.js","_app/immutable/chunks/each.C2fm_D23.js","_app/immutable/chunks/index.DUPWMsUm.js","_app/immutable/chunks/Product.BA17UUKc.js","_app/immutable/chunks/stores.CuPaPXIs.js","_app/immutable/chunks/index.DcCWJLEs.js"];
export const stylesheets = ["_app/immutable/assets/8.aWeLqdCy.css","_app/immutable/assets/Product.HpvcPrUy.css"];
export const fonts = [];
