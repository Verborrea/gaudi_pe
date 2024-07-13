import { e as error } from "../../../../chunks/index.js";
import { p as products } from "../../../../chunks/productos.js";
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
export {
  load
};
