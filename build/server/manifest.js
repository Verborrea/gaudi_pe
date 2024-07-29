const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","browserconfig.xml","favicon-16x16.png","favicon-32x32.png","favicon.ico","mstile-144x144.png","mstile-150x150.png","mstile-310x150.png","mstile-310x310.png","mstile-70x70.png","og_image.jpeg","products/fb-b.avif","products/fb-lata.avif","products/fb-latas.avif","products/limon-b.avif","products/limon-lata.avif","products/limon-latas.avif","products/manzana-lata.avif","products/manzana-latas.avif","safari-pinned-tab.svg","site.webmanifest"]),
	mimeTypes: {".png":"image/png",".xml":"text/xml",".jpeg":"image/jpeg",".avif":"image/avif",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"},
	_: {
		client: {"start":"_app/immutable/entry/start.pHJgQBYo.js","app":"_app/immutable/entry/app.D0AVcgJd.js","imports":["_app/immutable/entry/start.pHJgQBYo.js","_app/immutable/chunks/entry.Dh1-hvym.js","_app/immutable/chunks/scheduler.DxlGDd7X.js","_app/immutable/chunks/index.DYpupPmn.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/entry/app.D0AVcgJd.js","_app/immutable/chunks/scheduler.DxlGDd7X.js","_app/immutable/chunks/index.BwqU91H_.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-Dpbu-xGr.js')),
			__memo(() => import('./chunks/1-DMi45Gb1.js')),
			__memo(() => import('./chunks/2-CEH5Fi62.js')),
			__memo(() => import('./chunks/3-DNSdnIIT.js')),
			__memo(() => import('./chunks/4-CmVJBsYt.js')),
			__memo(() => import('./chunks/5-Db4gyV-A.js')),
			__memo(() => import('./chunks/6-BMWFYUyr.js')),
			__memo(() => import('./chunks/7-BwUDsiKp.js')),
			__memo(() => import('./chunks/8-DJEXeIJV.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/buy",
				pattern: /^\/api\/buy\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CmXdCy30.js'))
			},
			{
				id: "/carrito",
				pattern: /^\/carrito\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/checkout",
				pattern: /^\/checkout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/gracias",
				pattern: /^\/gracias\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/mapa",
				pattern: /^\/mapa\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/qr",
				pattern: /^\/qr\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Bjr6k1tg.js'))
			},
			{
				id: "/tienda",
				pattern: /^\/tienda\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/tienda/[id]",
				pattern: /^\/tienda\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
