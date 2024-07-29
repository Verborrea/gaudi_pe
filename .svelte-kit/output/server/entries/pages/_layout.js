import { e as error } from "../../chunks/index.js";
const ssr = false;
async function load({ fetch }) {
  const res = await fetch("https://api.gaudi.pe/items");
  if (!res.ok) {
    console.error(res);
    throw error(res.status);
  }
  const products = await res.json();
  return { products };
}
export {
  load,
  ssr
};
