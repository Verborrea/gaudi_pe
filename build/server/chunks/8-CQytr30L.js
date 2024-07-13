import { e as error } from './index-DzcLzHBX.js';
import { p as products } from './productos-CYIJb9xP.js';

function obtenerTresElementosAleatorios(array) {
  const resultado = /* @__PURE__ */ new Set();
  while (resultado.size < 3) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    resultado.add(array[indiceAleatorio]);
  }
  return Array.from(resultado);
}
async function load({ params }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) throw error(404);
  return {
    product,
    products: obtenerTresElementosAleatorios(products)
  };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-gU8GfSer.js')).default;
const universal_id = "src/routes/tienda/[id]/+page.js";
const imports = ["_app/immutable/nodes/8.Ci3M-yfk.js","_app/immutable/chunks/productos.CkYuVUUv.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/scheduler.DKRIXM0x.js","_app/immutable/chunks/index.C8C-eI0O.js","_app/immutable/chunks/each.C2fm_D23.js","_app/immutable/chunks/index.DUPWMsUm.js","_app/immutable/chunks/Product.BA17UUKc.js","_app/immutable/chunks/stores.CuPaPXIs.js","_app/immutable/chunks/index.DcCWJLEs.js"];
const stylesheets = ["_app/immutable/assets/8.aWeLqdCy.css","_app/immutable/assets/Product.HpvcPrUy.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=8-CQytr30L.js.map
