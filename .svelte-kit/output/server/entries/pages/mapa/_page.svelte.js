import { c as create_ssr_component, b as subscribe, e as escape } from "../../../chunks/ssr.js";
import "mapbox-gl";
import { e as envio } from "../../../chunks/stores2.js";
const css = {
  code: "main.svelte-4xbij2{padding-bottom:64px}.cols.svelte-4xbij2{display:flex;gap:32px;align-items:center}#map.svelte-4xbij2{flex:0 0 50%;height:480px;width:min(100%, 800px)}.info.svelte-4xbij2{flex:0 1 50%;border:2px solid var(--background);padding:32px}p.svelte-4xbij2{font-size:16px;color:var(--disabled)}.nm.svelte-4xbij2{margin:0}.fc.svelte-4xbij2{justify-content:space-between;gap:16px}@media(max-width: 700px){p.svelte-4xbij2{font-size:14px}#map.svelte-4xbij2{height:400px}#map.svelte-4xbij2,.info.svelte-4xbij2{flex:unset}.cols.svelte-4xbij2{flex-direction:column}main.svelte-4xbij2{padding-bottom:0}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\timport mapboxgl from \\"mapbox-gl\\"\\n\\timport { polygon } from \\"@turf/helpers\\"\\n\\timport { booleanPointInPolygon } from \\"@turf/boolean-point-in-polygon\\"\\n\\timport { onMount } from \\"svelte\\"\\n\\timport { envio } from \\"$lib/stores.js\\"\\n\\n\\texport let data\\n\\n\\tfunction obtenerPropiedadDeZona(punto) {\\n\\t\\tfor (const zona of data.zonas.features) {\\n\\t\\t\\tconst turfPoly = polygon(zona.geometry.coordinates)\\n\\t\\t\\tif (booleanPointInPolygon(punto, turfPoly)) {\\n\\t\\t\\t\\treturn zona.properties;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn null;\\n\\t}\\n\\n\\tonMount(() => {\\n\\t\\tlet map = new mapboxgl.Map({\\n\\t\\t\\tcontainer: 'map',\\n\\t\\t\\tcenter: [-71.536973, -16.398822],\\n\\t\\t\\tzoom: 12,\\n\\t\\t\\tstyle: 'mapbox://styles/mapbox/light-v11',\\n\\t\\t\\taccessToken: 'pk.eyJ1IjoiYWxhbi0yNSIsImEiOiJjbGViaGI4aDkwcHpxM25udTAwaWcyczFrIn0.MZhpce5K1n4Gi7xBVGFj6Q'\\n\\t\\t})\\n\\n\\t\\tlet marker = new mapboxgl.Marker()\\n\\t\\t\\t.setLngLat([-71.536973, -16.398822])\\n\\t\\t\\t.addTo(map)\\n\\n\\t\\tmap.addControl(\\n\\t\\t\\tnew mapboxgl.GeolocateControl({\\n\\t\\t\\t\\tpositionOptions: {\\n\\t\\t\\t\\t\\tenableHighAccuracy: true\\n\\t\\t\\t\\t},\\n\\t\\t\\t\\t// When active the map will receive updates to the device's location as it changes.\\n\\t\\t\\t\\ttrackUserLocation: true,\\n\\t\\t\\t\\t// Draw an arrow next to the location dot to indicate which direction the device is heading.\\n\\t\\t\\t\\tshowUserHeading: true\\n\\t\\t\\t})\\n\\t\\t);\\n\\n\\t\\tmap.on('load', () => {\\n\\t\\t\\tmap.addSource('zones', {\\n\\t\\t\\t\\ttype: 'geojson',\\n\\t\\t\\t\\tdata: data.zonas\\n\\t\\t\\t});\\n\\n\\t\\t\\tconst matchFillExpression = ['match', ['get', 'dias']];\\n\\t\\t\\tconst matchLineExpression = ['match', ['get', 'dias']];\\n\\n\\t\\t\\t// Colores transparentes para los rellenos\\n\\t\\t\\tmatchFillExpression.push('lunes', 'rgba(222,50,76,0.3)');\\n\\t\\t\\tmatchFillExpression.push('martes', 'rgba(244,137,95, 0.3)');\\n\\t\\t\\tmatchFillExpression.push('miercoles', 'rgba(248,225,111, 0.3)');\\n\\t\\t\\tmatchFillExpression.push('jueves', 'rgba(149,207,146, 0.3)');\\n\\t\\t\\tmatchFillExpression.push('viernes', 'rgba(54,154,204, 0.3)');\\n\\t\\t\\tmatchFillExpression.push('sabado', 'rgba(150,86,162, 0.3)');\\n\\t\\t\\tmatchFillExpression.push('rgba(0, 0, 0, 0)');\\n\\n\\t\\t\\t// Colores opacos para las líneas\\n\\t\\t\\tmatchLineExpression.push('lunes', '#de324c');\\n\\t\\t\\tmatchLineExpression.push('martes', '#f4895f');\\n\\t\\t\\tmatchLineExpression.push('miercoles', '#f8e16f');\\n\\t\\t\\tmatchLineExpression.push('jueves', '#95cf92');\\n\\t\\t\\tmatchLineExpression.push('viernes', '#369acc');\\n\\t\\t\\tmatchLineExpression.push('sabado', '#9656a2');\\n\\t\\t\\tmatchLineExpression.push('rgb(0, 0, 0)');\\n\\n\\t\\t\\t// Capa de relleno con transparencia\\n\\t\\t\\tmap.addLayer({\\n\\t\\t\\t\\t'id': 'zones-fill',\\n\\t\\t\\t\\t'type': 'fill',\\n\\t\\t\\t\\t'source': 'zones',\\n\\t\\t\\t\\t'paint': {\\n\\t\\t\\t\\t\\t'fill-color': matchFillExpression\\n\\t\\t\\t\\t}\\n\\t\\t\\t});\\n\\n\\t\\t\\t// Capa de líneas opacas\\n\\t\\t\\tmap.addLayer({\\n\\t\\t\\t\\t'id': 'zones-line',\\n\\t\\t\\t\\t'type': 'line',\\n\\t\\t\\t\\t'source': 'zones',\\n\\t\\t\\t\\t'paint': {\\n\\t\\t\\t\\t\\t'line-color': matchLineExpression,\\n\\t\\t\\t\\t\\t'line-width': 1\\n\\t\\t\\t\\t}\\n\\t\\t\\t});\\n\\t\\t});\\n\\n\\t\\tmap.on('move', (e) => {\\n\\t\\t\\tmarker.setLngLat(map.getCenter())\\n\\t\\t});\\n\\n\\t\\t$envio.isSet = true\\n\\t\\t$envio.price = 3\\n\\t\\t$envio.dia = \\"Lunes y Sábado\\"\\n\\t\\t$envio.coords = map.getCenter().toArray()\\n\\n\\t\\tconst preciosDict = {\\n\\t\\t\\tlunes: 5,\\n\\t\\t\\tmartes: 5,\\n\\t\\t\\tmiercoles: 5,\\n\\t\\t\\tjueves: 5,\\n\\t\\t\\tviernes: 5,\\n\\t\\t\\tsabado: 5\\n\\t\\t}\\n\\t\\t\\t\\n\\t\\tconst diasDict = {\\n\\t\\t\\tlunes: \\"Lunes\\",\\n\\t\\t\\tmartes: \\"Martes\\",\\n\\t\\t\\tmiercoles: \\"Miércoles\\",\\n\\t\\t\\tjueves: \\"Jueves\\",\\n\\t\\t\\tviernes: \\"Viernes\\",\\n\\t\\t\\tsabado: \\"Sábado\\"\\n\\t\\t}\\n\\n\\t\\tmap.on('moveend', (e) => {\\n\\t\\t\\tlet zone = obtenerPropiedadDeZona(map.getCenter().toArray())\\n\\t\\t\\t$envio.isSet = true\\n\\t\\t\\t$envio.price = preciosDict[zone?.dias]\\n\\t\\t\\t$envio.dia = diasDict[zone?.dias]\\n\\t\\t\\tif (zone.nombre == 'centro arriba' || zone.nombre == 'centro abajo') {\\n\\t\\t\\t\\t$envio.price = 3\\n\\t\\t\\t\\t$envio.dia = 'Lunes y Sábado'\\n\\t\\t\\t}\\n\\t\\t\\t$envio.coords = map.getCenter().toArray()\\n\\t\\t})\\n\\t})\\n<\/script>\\n\\n<svelte:head>\\n\\t<link href='https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css' rel='stylesheet' />\\n</svelte:head>\\n\\n<main>\\n\\t<div class=\\"ma\\">\\n\\t\\t<h1 class=\\"title\\">Seleccione su ubicación</h1>\\n\\t\\t<div class=\\"cols\\">\\n\\t\\t\\t<div id=\\"map\\"></div>\\n\\t\\t\\t<div class=\\"info\\">\\n\\t\\t\\t\\t<p class=\\"nm\\">Por favor seleccione la dirección de envío en el mapa</p>\\n\\t\\t\\t\\t{#if ($envio.price !== undefined)}\\n\\t\\t\\t\\t\\t<div class=\\"fc\\">\\n\\t\\t\\t\\t\\t\\t<p>Costo de envío:</p>\\n\\t\\t\\t\\t\\t\\t<p>S/&nbsp;{$envio.price.toFixed(2)}</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t<div class=\\"fc\\">\\n\\t\\t\\t\\t\\t\\t<p>Día de envío:</p>\\n\\t\\t\\t\\t\\t\\t<p>{$envio.dia}</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<p>Pongase en contacto con nosotros para el precio del envío.</p>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t<a href=\\"/carrito\\" class=\\"btn btn-main\\">Continuar</a>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</main>\\n\\n<style>\\n\\tmain {\\n\\t\\tpadding-bottom: 64px;\\n\\t}\\n\\t.cols {\\n\\t\\tdisplay: flex;\\n\\t\\tgap: 32px;\\n\\t\\talign-items: center;\\n\\t}\\n\\t#map {\\n\\t\\tflex: 0 0 50%; \\n\\t\\theight: 480px;\\n\\t\\twidth: min(100%, 800px);\\n\\t}\\n\\t.info {\\n\\t\\tflex: 0 1 50%; \\n\\t\\tborder: 2px solid var(--background);\\n\\t\\tpadding: 32px;\\n\\t}\\n\\tp {\\n\\t\\tfont-size: 16px;\\n    \\tcolor: var(--disabled);\\n\\t}\\n\\t.nm {\\n\\t\\tmargin: 0;\\n\\t}\\n\\t.fc {\\n\\t\\tjustify-content: space-between;\\n    \\tgap: 16px;\\n\\t}\\n\\t@media (max-width: 700px) {\\n\\t\\tp {\\n\\t\\t\\tfont-size: 14px;\\n\\t\\t}\\n\\t\\t#map {\\n\\t\\t\\theight: 400px;\\n\\t\\t}\\n\\t\\t#map, .info {\\n\\t\\t\\tflex: unset;\\n\\t\\t}\\n\\t\\t.cols {\\n\\t\\t\\tflex-direction: column;\\n\\t\\t}\\n\\t\\tmain {\\n\\t\\t\\tpadding-bottom: 0;\\n\\t\\t}\\n\\t}\\n</style>"],"names":[],"mappings":"AAoKC,kBAAK,CACJ,cAAc,CAAE,IACjB,CACA,mBAAM,CACL,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,CACT,WAAW,CAAE,MACd,CACA,kBAAK,CACJ,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CACb,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,IAAI,IAAI,CAAC,CAAC,KAAK,CACvB,CACA,mBAAM,CACL,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,YAAY,CAAC,CACnC,OAAO,CAAE,IACV,CACA,eAAE,CACD,SAAS,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,UAAU,CACzB,CACA,iBAAI,CACH,MAAM,CAAE,CACT,CACA,iBAAI,CACH,eAAe,CAAE,aAAa,CAC3B,GAAG,CAAE,IACT,CACA,MAAO,YAAY,KAAK,CAAE,CACzB,eAAE,CACD,SAAS,CAAE,IACZ,CACA,kBAAK,CACJ,MAAM,CAAE,KACT,CACA,kBAAI,CAAE,mBAAM,CACX,IAAI,CAAE,KACP,CACA,mBAAM,CACL,cAAc,CAAE,MACjB,CACA,kBAAK,CACJ,cAAc,CAAE,CACjB,CACD"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $envio, $$unsubscribe_envio;
  $$unsubscribe_envio = subscribe(envio, (value) => $envio = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_envio();
  return `${$$result.head += `<!-- HEAD_svelte-9l0kuo_START --><link href="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css" rel="stylesheet"><!-- HEAD_svelte-9l0kuo_END -->`, ""} <main class="svelte-4xbij2"><div class="ma"><h1 class="title" data-svelte-h="svelte-seql32">Seleccione su ubicación</h1> <div class="cols svelte-4xbij2"><div id="map" class="svelte-4xbij2"></div> <div class="info svelte-4xbij2"><p class="nm svelte-4xbij2" data-svelte-h="svelte-1rkhof">Por favor seleccione la dirección de envío en el mapa</p> ${$envio.price !== void 0 ? `<div class="fc svelte-4xbij2"><p class="svelte-4xbij2" data-svelte-h="svelte-lusg0s">Costo de envío:</p> <p class="svelte-4xbij2">S/ ${escape($envio.price.toFixed(2))}</p></div> <div class="fc svelte-4xbij2"><p class="svelte-4xbij2" data-svelte-h="svelte-8zmgh8">Día de envío:</p> <p class="svelte-4xbij2">${escape($envio.dia)}</p></div>` : `<p class="svelte-4xbij2" data-svelte-h="svelte-1rmtvpd">Pongase en contacto con nosotros para el precio del envío.</p>`} <a href="/carrito" class="btn btn-main" data-svelte-h="svelte-gwl7vf">Continuar</a></div></div></div> </main>`;
});
export {
  Page as default
};
