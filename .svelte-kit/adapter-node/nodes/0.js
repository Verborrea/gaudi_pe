import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.C02BKCoi.js","_app/immutable/chunks/productos.CkYuVUUv.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/scheduler.DKRIXM0x.js","_app/immutable/chunks/index.C8C-eI0O.js","_app/immutable/chunks/stores.x1bh_kpb.js","_app/immutable/chunks/entry.D6_r9q0Q.js","_app/immutable/chunks/index.DcCWJLEs.js","_app/immutable/chunks/stores.CuPaPXIs.js","_app/immutable/chunks/each.C2fm_D23.js","_app/immutable/chunks/spread.CgU5AtxT.js"];
export const stylesheets = ["_app/immutable/assets/0.CL2bCs1v.css"];
export const fonts = [];
