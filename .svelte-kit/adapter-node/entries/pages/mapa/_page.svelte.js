import { c as create_ssr_component, b as subscribe, e as escape } from "../../../chunks/ssr.js";
import "mapbox-gl";
import { e as envio } from "../../../chunks/stores2.js";
const css = {
  code: "main.svelte-17yz1rt.svelte-17yz1rt{padding-bottom:64px}.cols.svelte-17yz1rt.svelte-17yz1rt{display:flex;gap:32px;align-items:center}#map.svelte-17yz1rt.svelte-17yz1rt{flex:0 0 50%;height:480px;width:min(100%, 800px)}.info.svelte-17yz1rt.svelte-17yz1rt{flex:0 1 50%;border:2px solid var(--background);padding:32px}p.svelte-17yz1rt.svelte-17yz1rt,ul.svelte-17yz1rt.svelte-17yz1rt{font-size:16px;color:var(--disabled)}.nm.svelte-17yz1rt.svelte-17yz1rt{margin:0}li.svelte-17yz1rt>a.svelte-17yz1rt{color:var(--accent)}.fc.svelte-17yz1rt.svelte-17yz1rt{justify-content:space-between;gap:16px}@media(max-width: 700px){p.svelte-17yz1rt.svelte-17yz1rt{font-size:14px}#map.svelte-17yz1rt.svelte-17yz1rt{height:400px}#map.svelte-17yz1rt.svelte-17yz1rt,.info.svelte-17yz1rt.svelte-17yz1rt{flex:unset}.cols.svelte-17yz1rt.svelte-17yz1rt{flex-direction:column}main.svelte-17yz1rt.svelte-17yz1rt{padding-bottom:0}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\timport mapboxgl from \\"mapbox-gl\\"\\n\\timport { polygon } from \\"@turf/helpers\\"\\n\\timport { booleanPointInPolygon } from \\"@turf/boolean-point-in-polygon\\"\\n\\timport { onMount, tick } from \\"svelte\\"\\n\\timport { envio } from \\"$lib/stores.js\\"\\n\\n\\texport let data\\n\\n\\tconst zones = JSON.parse(data.zonas)\\n\\tconst formatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });\\n\\n\\tconst days = {\\n\\t\\tL: 'Lunes',\\n\\t\\tM: 'Martes',\\n\\t\\tX: 'Miércoles',\\n\\t\\tJ: 'Jueves',\\n\\t\\tV: 'Viernes',\\n\\t\\tS: 'Sábado',\\n\\t\\tD: 'Domingo'\\n\\t}\\n\\t\\t\\t\\n\\tfunction obtenerPropiedadDeZona(punto) {\\n\\t\\tfor (const zona of zones.features) {\\n\\t\\t\\tconst turfPoly = polygon(zona.geometry.coordinates)\\n\\t\\t\\tif (booleanPointInPolygon(punto, turfPoly)) {\\n\\t\\t\\t\\treturn zona.properties;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn null;\\n\\t}\\n\\n\\tonMount(() => {\\n\\t\\tlet map = new mapboxgl.Map({\\n\\t\\t\\tcontainer: 'map',\\n\\t\\t\\tcenter: $envio.coords,\\n\\t\\t\\tzoom: 12,\\n\\t\\t\\tstyle: 'mapbox://styles/mapbox/light-v11',\\n\\t\\t\\taccessToken: 'pk.eyJ1IjoiYWxhbi0yNSIsImEiOiJjbGViaGI4aDkwcHpxM25udTAwaWcyczFrIn0.MZhpce5K1n4Gi7xBVGFj6Q'\\n\\t\\t})\\n\\n\\t\\tlet marker = new mapboxgl.Marker()\\n\\t\\t\\t.setLngLat($envio.coords)\\n\\t\\t\\t.addTo(map)\\n\\n\\t\\tmap.addControl(\\n\\t\\t\\tnew mapboxgl.GeolocateControl({\\n\\t\\t\\t\\tpositionOptions: {\\n\\t\\t\\t\\t\\tenableHighAccuracy: true\\n\\t\\t\\t\\t},\\n\\t\\t\\t\\t// When active the map will receive updates to the device's location as it changes.\\n\\t\\t\\t\\ttrackUserLocation: true,\\n\\t\\t\\t\\t// Draw an arrow next to the location dot to indicate which direction the device is heading.\\n\\t\\t\\t\\tshowUserHeading: true\\n\\t\\t\\t})\\n\\t\\t);\\n\\n\\t\\tmap.on('load', () => {\\n\\t\\t\\tmap.addSource('zones', {\\n\\t\\t\\t\\ttype: 'geojson',\\n\\t\\t\\t\\tdata: zones\\n\\t\\t\\t});\\n\\n\\t\\t\\t// Capa de relleno con transparencia\\n\\t\\t\\tmap.addLayer({\\n\\t\\t\\t\\t'id': 'zones-fill',\\n\\t\\t\\t\\t'type': 'fill',\\n\\t\\t\\t\\t'source': 'zones',\\n\\t\\t\\t\\t'paint': {\\n\\t\\t\\t\\t\\t'fill-color': 'rgba(0,0,0,0.25)'\\n\\t\\t\\t\\t}\\n\\t\\t\\t});\\n\\n\\t\\t\\t// Capa de líneas opacas\\n\\t\\t\\tmap.addLayer({\\n\\t\\t\\t\\t'id': 'zones-line',\\n\\t\\t\\t\\t'type': 'line',\\n\\t\\t\\t\\t'source': 'zones',\\n\\t\\t\\t\\t'paint': {\\n\\t\\t\\t\\t\\t'line-color': 'black',\\n\\t\\t\\t\\t\\t'line-width': 2\\n\\t\\t\\t\\t}\\n\\t\\t\\t});\\n\\t\\t});\\n\\n\\t\\tmap.on('move', (e) => {\\n\\t\\t\\tmarker.setLngLat(map.getCenter())\\n\\t\\t});\\n\\n\\t\\tmap.on('moveend', (e) => {\\n\\t\\t\\tlet zone = obtenerPropiedadDeZona(map.getCenter().toArray())\\n\\t\\t\\t$envio.isSet = true\\n\\t\\t\\t$envio.price = zone?.precio || 0\\nd\\n\\t\\t\\t$envio.dia = zone?.dias?.map(d => days[d]) || []\\n\\t\\t\\t$envio.coords = map.getCenter().toArray()\\n\\t\\t})\\n\\n\\t\\tconst initial_zone = obtenerPropiedadDeZona(map.getCenter().toArray())\\n\\t\\t$envio.isSet = true\\n\\t\\t$envio.price = initial_zone?.precio || 0\\n\\t\\t$envio.dia = initial_zone?.dias?.map(d => days[d]) || []\\n\\t\\t$envio.coords = map.getCenter().toArray()\\n\\t})\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Gaudí | Zona de envío</title>\\n\\t<link href='https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css' rel='stylesheet' />\\n</svelte:head>\\n\\n<main>\\n\\t<div class=\\"ma\\">\\n\\t\\t<h1 class=\\"title\\">Seleccione su ubicación</h1>\\n\\t\\t<div class=\\"cols\\">\\n\\t\\t\\t<div id=\\"map\\"></div>\\n\\t\\t\\t<div class=\\"info\\">\\n\\t\\t\\t\\t<p class=\\"nm\\">Por favor seleccione la dirección de envío en el mapa</p>\\n\\t\\t\\t\\t{#if ($envio.dia.length > 0)}\\n\\t\\t\\t\\t\\t<div class=\\"fc\\">\\n\\t\\t\\t\\t\\t\\t<p>Costo de envío:</p>\\n\\t\\t\\t\\t\\t\\t<p>S/&nbsp;{$envio.price.toFixed(2)}</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t<div class=\\"fc\\">\\n\\t\\t\\t\\t\\t\\t<p>Día(s) de envío:</p>\\n\\t\\t\\t\\t\\t\\t<p>{formatter.format($envio.dia)}</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<p>\\n\\t\\t\\t\\t\\t\\tPongase en contacto con nosotros para el precio del envío. Puede escribirnos\\n\\t\\t\\t\\t\\t\\ta cualquiera de los siguientes números:\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t\\t<ul>\\n\\t\\t\\t\\t\\t\\t<li>\\n\\t\\t\\t\\t\\t\\t\\t<a href=\\"https://wa.me/51978685152\\" target=\\"_blank\\">+51 978 685 152</a>\\n\\t\\t\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t\\t\\t<li>\\n\\t\\t\\t\\t\\t\\t\\t<a href=\\"https://wa.me/51910880595\\" target=\\"_blank\\">+51 910 880 595</a>\\n\\t\\t\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t\\t</ul>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t<a href=\\"/carrito\\" class=\\"btn btn-main\\">Continuar</a>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</main>\\n\\n<style>\\n\\tmain {\\n\\t\\tpadding-bottom: 64px;\\n\\t}\\n\\t.cols {\\n\\t\\tdisplay: flex;\\n\\t\\tgap: 32px;\\n\\t\\talign-items: center;\\n\\t}\\n\\t#map {\\n\\t\\tflex: 0 0 50%; \\n\\t\\theight: 480px;\\n\\t\\twidth: min(100%, 800px);\\n\\t}\\n\\t.info {\\n\\t\\tflex: 0 1 50%; \\n\\t\\tborder: 2px solid var(--background);\\n\\t\\tpadding: 32px;\\n\\t}\\n\\tp, ul {\\n\\t\\tfont-size: 16px;\\n    \\tcolor: var(--disabled);\\n\\t}\\n\\t.nm {\\n\\t\\tmargin: 0;\\n\\t}\\n\\tli>a {\\n\\t\\tcolor: var(--accent);\\n\\t}\\n\\t.fc {\\n\\t\\tjustify-content: space-between;\\n    \\tgap: 16px;\\n\\t}\\n\\t@media (max-width: 700px) {\\n\\t\\tp {\\n\\t\\t\\tfont-size: 14px;\\n\\t\\t}\\n\\t\\t#map {\\n\\t\\t\\theight: 400px;\\n\\t\\t}\\n\\t\\t#map, .info {\\n\\t\\t\\tflex: unset;\\n\\t\\t}\\n\\t\\t.cols {\\n\\t\\t\\tflex-direction: column;\\n\\t\\t}\\n\\t\\tmain {\\n\\t\\t\\tpadding-bottom: 0;\\n\\t\\t}\\n\\t}\\n</style>"],"names":[],"mappings":"AAoJC,kCAAK,CACJ,cAAc,CAAE,IACjB,CACA,mCAAM,CACL,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,CACT,WAAW,CAAE,MACd,CACA,kCAAK,CACJ,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CACb,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,IAAI,IAAI,CAAC,CAAC,KAAK,CACvB,CACA,mCAAM,CACL,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,YAAY,CAAC,CACnC,OAAO,CAAE,IACV,CACA,+BAAC,CAAE,gCAAG,CACL,SAAS,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,UAAU,CACzB,CACA,iCAAI,CACH,MAAM,CAAE,CACT,CACA,iBAAE,CAAC,gBAAE,CACJ,KAAK,CAAE,IAAI,QAAQ,CACpB,CACA,iCAAI,CACH,eAAe,CAAE,aAAa,CAC3B,GAAG,CAAE,IACT,CACA,MAAO,YAAY,KAAK,CAAE,CACzB,+BAAE,CACD,SAAS,CAAE,IACZ,CACA,kCAAK,CACJ,MAAM,CAAE,KACT,CACA,kCAAI,CAAE,mCAAM,CACX,IAAI,CAAE,KACP,CACA,mCAAM,CACL,cAAc,CAAE,MACjB,CACA,kCAAK,CACJ,cAAc,CAAE,CACjB,CACD"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $envio, $$unsubscribe_envio;
  $$unsubscribe_envio = subscribe(envio, (value) => $envio = value);
  let { data } = $$props;
  JSON.parse(data.zonas);
  const formatter = new Intl.ListFormat("es", { style: "long", type: "conjunction" });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_envio();
  return `${$$result.head += `<!-- HEAD_svelte-i5qjx2_START -->${$$result.title = `<title>Gaudí | Zona de envío</title>`, ""}<link href="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css" rel="stylesheet"><!-- HEAD_svelte-i5qjx2_END -->`, ""} <main class="svelte-17yz1rt"><div class="ma"><h1 class="title" data-svelte-h="svelte-seql32">Seleccione su ubicación</h1> <div class="cols svelte-17yz1rt"><div id="map" class="svelte-17yz1rt"></div> <div class="info svelte-17yz1rt"><p class="nm svelte-17yz1rt" data-svelte-h="svelte-1rkhof">Por favor seleccione la dirección de envío en el mapa</p> ${$envio.dia.length > 0 ? `<div class="fc svelte-17yz1rt"><p class="svelte-17yz1rt" data-svelte-h="svelte-lusg0s">Costo de envío:</p> <p class="svelte-17yz1rt">S/ ${escape($envio.price.toFixed(2))}</p></div> <div class="fc svelte-17yz1rt"><p class="svelte-17yz1rt" data-svelte-h="svelte-19136zk">Día(s) de envío:</p> <p class="svelte-17yz1rt">${escape(formatter.format($envio.dia))}</p></div>` : `<p class="svelte-17yz1rt" data-svelte-h="svelte-7r6756">Pongase en contacto con nosotros para el precio del envío. Puede escribirnos
						a cualquiera de los siguientes números:</p> <ul class="svelte-17yz1rt" data-svelte-h="svelte-1aj5kaj"><li class="svelte-17yz1rt"><a href="https://wa.me/51978685152" target="_blank" class="svelte-17yz1rt">+51 978 685 152</a></li> <li class="svelte-17yz1rt"><a href="https://wa.me/51910880595" target="_blank" class="svelte-17yz1rt">+51 910 880 595</a></li></ul>`} <a href="/carrito" class="btn btn-main" data-svelte-h="svelte-gwl7vf">Continuar</a></div></div></div> </main>`;
});
export {
  Page as default
};
