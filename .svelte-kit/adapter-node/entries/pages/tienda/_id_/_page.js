import { e as error } from "../../../../chunks/index.js";
const ssr = false;
function obtenerTresElementosAleatorios(array) {
  const resultado = /* @__PURE__ */ new Set();
  while (resultado.size < 3) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    resultado.add(array[indiceAleatorio]);
  }
  return Array.from(resultado);
}
async function load({ fetch, params }) {
  const res = await fetch("https://api.gaudi.pe/items");
  if (!res.ok) {
    console.error(res);
    throw error(res.status);
  }
  let products = await res.json();
  products = products.map((p) => {
    return { ...p, price: p.original };
  });
  const product = products.find((p) => p.id == params.id);
  if (!product) throw error(404);
  return {
    product,
    products: obtenerTresElementosAleatorios(products)
  };
}
export {
  load,
  ssr
};
