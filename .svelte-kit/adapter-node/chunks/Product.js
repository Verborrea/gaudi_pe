import { c as create_ssr_component, b as subscribe, e as escape, a as add_attribute } from "./ssr.js";
import { c as cart } from "./stores2.js";
const css = {
  code: "article.svelte-10y6fsu.svelte-10y6fsu{font-size:14px;display:flex;flex-direction:column}img.svelte-10y6fsu.svelte-10y6fsu{height:100%;width:100%;transition:all 0.2s ease-out}.img-container.svelte-10y6fsu.svelte-10y6fsu{height:100%;display:block;overflow:hidden}.img.svelte-10y6fsu:hover img.svelte-10y6fsu{transform:scale(1.1)}.img.svelte-10y6fsu.svelte-10y6fsu{flex:1}.actions.svelte-10y6fsu.svelte-10y6fsu,.discount.svelte-10y6fsu.svelte-10y6fsu{position:absolute;z-index:2}.actions.svelte-10y6fsu.svelte-10y6fsu{right:8px;top:8px;display:flex;flex-direction:column;gap:8px;display:none}article.svelte-10y6fsu:hover .actions.svelte-10y6fsu{display:flex}.atc.svelte-10y6fsu.svelte-10y6fsu{background:#f0f0f0;border-radius:50%;padding:8px;transition:all 0.2s ease-out;outline:0px solid #f0f0f0}.atc.svelte-10y6fsu.svelte-10y6fsu:hover{background:var(--accent);outline:2px solid salmon}.atc.svelte-10y6fsu:hover path.svelte-10y6fsu{fill:white}.discount.svelte-10y6fsu.svelte-10y6fsu{background:var(--accent);color:white;padding:16px}.precios.svelte-10y6fsu.svelte-10y6fsu{font-size:16px;font-weight:800;gap:8px;justify-content:center}.precios.svelte-10y6fsu .secondary.svelte-10y6fsu{text-decoration:line-through;color:var(--disabled)}.precios.svelte-10y6fsu .main.svelte-10y6fsu{color:var(--accent)}a.svelte-10y6fsu.svelte-10y6fsu{text-decoration:none;color:var(--text)}p.svelte-10y6fsu.svelte-10y6fsu{margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.name.svelte-10y6fsu.svelte-10y6fsu:hover{color:var(--accent)}@media(max-width: 700px){.actions.svelte-10y6fsu.svelte-10y6fsu{display:flex !important}}",
  map: '{"version":3,"file":"Product.svelte","sources":["Product.svelte"],"sourcesContent":["<script>\\n\\timport { fade, fly } from \\"svelte/transition\\"\\n\\timport { cart } from \\"$lib/stores.js\\"\\n\\n\\texport let id\\n\\texport let src\\n\\texport let name\\n\\texport let price\\n\\texport let discount\\n\\texport let measure\\n\\texport let special_discount\\n\\texport let special_discount_quantity\\n\\n\\tlet showToast\\n\\n\\tfunction addProduct() {\\n\\t\\tcart.addItem({id, price, discount, measure, special_discount, special_discount_quantity})\\n\\t\\tif ($cart.showToast === true) {\\n\\t\\t\\tcart.resetToast()\\n\\t\\t\\tshowToast = true;\\n\\t\\t\\tsetTimeout(() => {\\n\\t\\t\\t\\tshowToast = false;\\n\\t\\t\\t}, 2000);\\n\\t\\t}\\n\\t}\\n\\n\\tfunction removeProduct() {\\n\\t\\tcart.removeItem({id, price, discount, measure, special_discount, special_discount_quantity})\\n\\t}\\n\\n<\/script>\\n\\n{#if showToast}\\n\\t<div in:fly={{ y: -200, duration: 500 }} out:fade class=\\"toast\\">\\n\\t\\t🎉 Descuento especial por six-pack 🎉\\n\\t</div>\\n{/if}\\n<article>\\n\\t<div class=\\"img rl\\">\\n\\t\\t{#if discount}\\n\\t\\t\\t<div class=\\"discount\\">\\n\\t\\t\\t\\t{`-${(discount * 100).toFixed(0)}%`}\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\t\\t<div class=\\"actions\\">\\n\\t\\t\\t<button type=\\"button\\" class=\\"atc\\" on:click={addProduct} title=\\"Añadir al carrito\\">\\n\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" height=\\"24px\\" viewBox=\\"0 -960 960 960\\" width=\\"24px\\" fill=\\"#737373\\"><path d=\\"M427-428H221q-22 0-37.5-15.5T168-481q0-22 15.5-37.5T221-534h206v-206q0-22 15.5-37.5T480-793q22 0 37.5 15.5T533-740v206h206q22 0 37.5 15.5T792-481q0 22-15.5 37.5T739-428H533v206q0 22-15.5 37.5T480-169q-22 0-37.5-15.5T427-222v-206Z\\"/></svg>\\n\\t\\t\\t</button>\\n\\t\\t\\t<button type=\\"button\\" class=\\"atc\\" on:click={removeProduct} title=\\"Remover del carrito\\">\\n\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" height=\\"24px\\" viewBox=\\"0 -960 960 960\\" width=\\"24px\\" fill=\\"#737373\\"><path d=\\"M221-428q-22 0-37.5-15.5T168-481q0-22 15.5-37.5T221-534h518q22 0 37.5 15.5T792-481q0 22-15.5 37.5T739-428H221Z\\"/></svg>\\n\\t\\t\\t</button>\\n\\t\\t</div>\\n\\t\\t<a href=\\"/tienda/{id}\\" class=\\"img-container\\">\\n\\t\\t\\t<img {src} alt=\\"Tengo sueño jajaja\\">\\n\\t\\t</a>\\n\\t</div>\\n\\t<a class=\\"name\\" href=\\"/tienda/{id}\\"><p>{name}</p></a>\\n\\t<div class=\\"fc precios\\">\\n\\t\\t{#if discount}\\n\\t\\t\\t<div class=\\"secondary\\">S/&nbsp;{price.toFixed(2)}</div>\\n\\t\\t\\t<div class=\\"main\\">S/&nbsp;{(price * (1 - discount)).toFixed(2)}</div>\\n\\t\\t{:else}\\n\\t\\t\\t<div class=\\"main\\">S/&nbsp;{price.toFixed(2)}</div>\\n\\t\\t{/if}\\n\\t</div>\\n</article>\\n\\n<style>\\n\\tarticle {\\n\\t\\tfont-size: 14px;\\n\\t\\tdisplay: flex;\\n    \\tflex-direction: column;\\n\\t}\\n\\timg {\\n\\t\\theight: 100%;\\n\\t\\twidth: 100%;\\n\\t\\ttransition: all 0.2s ease-out;\\n\\t}\\n\\t.img-container {\\n\\t\\theight: 100%;\\n\\t\\tdisplay: block;\\n\\t\\toverflow: hidden;\\n\\t}\\n\\t.img:hover img {\\n\\t\\ttransform: scale(1.1);\\n\\t}\\n\\t.img {\\n\\t\\tflex: 1;\\n\\t}\\n\\t.actions, .discount {\\n\\t\\tposition: absolute;\\n\\t\\tz-index: 2;\\n\\t}\\n\\t.actions {\\n\\t\\tright: 8px;\\n\\t\\ttop: 8px;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 8px;\\n\\t\\tdisplay: none;\\n\\t}\\n\\tarticle:hover .actions {\\n\\t\\tdisplay: flex;\\n\\t}\\n\\t.atc {\\n\\t\\tbackground: #f0f0f0;\\n\\t\\tborder-radius: 50%;\\n\\t\\tpadding: 8px;\\n\\t\\ttransition: all 0.2s ease-out;\\n\\t\\toutline: 0px solid #f0f0f0;\\n\\t}\\n\\t.atc:hover {\\n\\t\\tbackground: var(--accent);\\n\\t\\toutline: 2px solid salmon;\\n\\t}\\n\\t.atc:hover path {\\n\\t\\tfill: white;\\n\\t}\\n\\t.discount {\\n\\t\\tbackground: var(--accent);\\n\\t\\tcolor: white;\\n\\t\\tpadding: 16px;\\n\\t}\\n\\t.precios {\\n\\t\\tfont-size: 16px;\\n\\t\\tfont-weight: 800;\\n\\t\\tgap: 8px;\\n\\t\\tjustify-content: center;\\n\\t}\\n\\t.precios .secondary {\\n\\t\\ttext-decoration: line-through;\\n\\t\\tcolor: var(--disabled);\\n\\t}\\n\\t.precios .main {\\n\\t\\tcolor: var(--accent);\\n\\t}\\n\\ta {\\n\\t\\ttext-decoration: none;\\n\\t\\tcolor: var(--text);\\n\\t}\\n\\tp {\\n\\t\\tmargin: 0;\\n\\t\\tdisplay: -webkit-box;\\n\\t\\t-webkit-line-clamp: 2;\\n\\t\\t-webkit-box-orient: vertical;\\n\\t\\toverflow: hidden;\\n\\t}\\n\\t.name:hover {\\n\\t\\tcolor: var(--accent);\\n\\t}\\n\\t@media (max-width: 700px){\\n\\t\\t.actions {\\n\\t\\t\\tdisplay: flex !important;\\n\\t\\t}\\n\\t}\\n</style>"],"names":[],"mappings":"AAoEC,qCAAQ,CACP,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CACV,cAAc,CAAE,MACpB,CACA,iCAAI,CACH,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QACtB,CACA,4CAAe,CACd,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,MACX,CACA,mBAAI,MAAM,CAAC,kBAAI,CACd,SAAS,CAAE,MAAM,GAAG,CACrB,CACA,kCAAK,CACJ,IAAI,CAAE,CACP,CACA,sCAAQ,CAAE,uCAAU,CACnB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CACV,CACA,sCAAS,CACR,KAAK,CAAE,GAAG,CACV,GAAG,CAAE,GAAG,CACR,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,GAAG,CACR,OAAO,CAAE,IACV,CACA,sBAAO,MAAM,CAAC,uBAAS,CACtB,OAAO,CAAE,IACV,CACA,kCAAK,CACJ,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QAAQ,CAC7B,OAAO,CAAE,GAAG,CAAC,KAAK,CAAC,OACpB,CACA,kCAAI,MAAO,CACV,UAAU,CAAE,IAAI,QAAQ,CAAC,CACzB,OAAO,CAAE,GAAG,CAAC,KAAK,CAAC,MACpB,CACA,mBAAI,MAAM,CAAC,mBAAK,CACf,IAAI,CAAE,KACP,CACA,uCAAU,CACT,UAAU,CAAE,IAAI,QAAQ,CAAC,CACzB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IACV,CACA,sCAAS,CACR,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,GAAG,CAAE,GAAG,CACR,eAAe,CAAE,MAClB,CACA,uBAAQ,CAAC,yBAAW,CACnB,eAAe,CAAE,YAAY,CAC7B,KAAK,CAAE,IAAI,UAAU,CACtB,CACA,uBAAQ,CAAC,oBAAM,CACd,KAAK,CAAE,IAAI,QAAQ,CACpB,CACA,+BAAE,CACD,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,IAAI,MAAM,CAClB,CACA,+BAAE,CACD,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,WAAW,CACpB,kBAAkB,CAAE,CAAC,CACrB,kBAAkB,CAAE,QAAQ,CAC5B,QAAQ,CAAE,MACX,CACA,mCAAK,MAAO,CACX,KAAK,CAAE,IAAI,QAAQ,CACpB,CACA,MAAO,YAAY,KAAK,CAAC,CACxB,sCAAS,CACR,OAAO,CAAE,IAAI,CAAC,UACf,CACD"}'
};
const Product = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_cart;
  $$unsubscribe_cart = subscribe(cart, (value) => value);
  let { id } = $$props;
  let { src } = $$props;
  let { name } = $$props;
  let { price } = $$props;
  let { discount } = $$props;
  let { measure } = $$props;
  let { special_discount } = $$props;
  let { special_discount_quantity } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.price === void 0 && $$bindings.price && price !== void 0) $$bindings.price(price);
  if ($$props.discount === void 0 && $$bindings.discount && discount !== void 0) $$bindings.discount(discount);
  if ($$props.measure === void 0 && $$bindings.measure && measure !== void 0) $$bindings.measure(measure);
  if ($$props.special_discount === void 0 && $$bindings.special_discount && special_discount !== void 0) $$bindings.special_discount(special_discount);
  if ($$props.special_discount_quantity === void 0 && $$bindings.special_discount_quantity && special_discount_quantity !== void 0) $$bindings.special_discount_quantity(special_discount_quantity);
  $$result.css.add(css);
  $$unsubscribe_cart();
  return `${``} <article class="svelte-10y6fsu"><div class="img rl svelte-10y6fsu">${discount ? `<div class="discount svelte-10y6fsu">${escape(`-${(discount * 100).toFixed(0)}%`)}</div>` : ``} <div class="actions svelte-10y6fsu"><button type="button" class="atc svelte-10y6fsu" title="Añadir al carrito" data-svelte-h="svelte-ac6qdy"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#737373"><path d="M427-428H221q-22 0-37.5-15.5T168-481q0-22 15.5-37.5T221-534h206v-206q0-22 15.5-37.5T480-793q22 0 37.5 15.5T533-740v206h206q22 0 37.5 15.5T792-481q0 22-15.5 37.5T739-428H533v206q0 22-15.5 37.5T480-169q-22 0-37.5-15.5T427-222v-206Z" class="svelte-10y6fsu"></path></svg></button> <button type="button" class="atc svelte-10y6fsu" title="Remover del carrito" data-svelte-h="svelte-1uxqbgc"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#737373"><path d="M221-428q-22 0-37.5-15.5T168-481q0-22 15.5-37.5T221-534h518q22 0 37.5 15.5T792-481q0 22-15.5 37.5T739-428H221Z" class="svelte-10y6fsu"></path></svg></button></div> <a href="${"/tienda/" + escape(id, true)}" class="img-container svelte-10y6fsu"><img${add_attribute("src", src, 0)} alt="Tengo sueño jajaja" class="svelte-10y6fsu"></a></div> <a class="name svelte-10y6fsu" href="${"/tienda/" + escape(id, true)}"><p class="svelte-10y6fsu">${escape(name)}</p></a> <div class="fc precios svelte-10y6fsu">${discount ? `<div class="secondary svelte-10y6fsu">S/ ${escape(price.toFixed(2))}</div> <div class="main svelte-10y6fsu">S/ ${escape((price * (1 - discount)).toFixed(2))}</div>` : `<div class="main svelte-10y6fsu">S/ ${escape(price.toFixed(2))}</div>`}</div> </article>`;
});
export {
  Product as P
};
