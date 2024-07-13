import "../../chunks/index.js";
import { p as products } from "../../chunks/productos.js";
async function load({ fetch }) {
  return {
    products
  };
}
export {
  load
};
