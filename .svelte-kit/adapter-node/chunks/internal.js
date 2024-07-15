import { c as create_ssr_component, s as setContext, v as validate_component, m as missing_component } from "./ssr.js";
let base = "";
let assets = base;
const initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
function set_assets(path) {
  assets = initial.assets = path;
}
let public_env = {};
let safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
function afterUpdate() {
}
let prerendering = false;
function set_building() {
}
function set_prerendering() {
  prerendering = true;
}
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0) $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0) $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0) $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
function set_read_implementation(fn) {
}
function set_manifest(_) {
}
const options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="es-PE">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="apple-touch-icon" sizes="180x180" href="' + assets2 + '/apple-touch-icon.png?v=3">\n		<link rel="icon" type="image/png" sizes="32x32" href="' + assets2 + '/favicon-32x32.png?v=3">\n		<link rel="icon" type="image/png" sizes="16x16" href="' + assets2 + '/favicon-16x16.png?v=3">\n		<link rel="manifest" href="' + assets2 + '/site.webmanifest?v=3">\n		<link rel="mask-icon" href="' + assets2 + '/safari-pinned-tab.svg?v=3" color="#e72832">\n		<link rel="shortcut icon" href="' + assets2 + '/favicon.ico?v=3">\n		<meta name="msapplication-TileColor" content="#e72832">\n		<meta name="theme-color" content="#E72832">\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		<meta name="og:url" content="https://gaudi.pe/tienda">\n		<meta name="og:type" content="website">\n		<meta name="og:title" content="Gaudí | Tienda">\n		<meta name="og:description" content="Explora la tienda de Gaudi 🛍️ y compra las mejores bebidas de Kombucha artesanal en Perú. Variedad de sabores y beneficios para tu salud. ¡Haz tu pedido ahora!">\n		<meta name="og:site_name" content="Gaudí">\n		<meta property="og:image" content="https://gaudi.pe/og_image.jpeg" />\n		<meta property="og:image:secure_url" content="https://gaudi.pe/og_image.jpeg" />\n		<meta property="og:image:type" content="image/jpeg" />\n		<meta property="og:image:width" content="1200" />\n		<meta property="og:image:height" content="630" />\n		<meta property="og:image:alt" content="Tres latas de Kombucha Gaudí de distintos sabores" />\n		' + head + `
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
		<style>
			:root {
				--text: #110600;
				--accent: #E72832;
				--accent-hover: #951218;
				--disabled: #737373;
				--secondary: #faf3ed;
				--background: #f0f0f0;
				--gray-light: #dbdbdb;
			}
			* {
				box-sizing: border-box;
			}
			html {
				scroll-behavior: smooth;
			}
			body {
				color: var(--text);
				margin: 0;
			}
			body, button, input, textarea {
				font-family: 'Poppins', sans-serif;
			}
			button {
				padding: 0;
				border: none;
				background: transparent;
			}
			button:active, .btn:active {
				transform: scale(0.9);
			}
			img, svg {
				display: block;
				object-fit: cover;
			}
			hr {
				border: none;
				height: 1px;
				width: 100%;
				background: var(--disabled);
			}
			.title {
				text-align: center;
				font-weight: 400;
				font-size: 3em;
			}
			.fc {
				display: flex;
				align-items: center;
			}
			.rl {
				position: relative;
			}
			.ma {
				max-width: 1200px;
				margin: auto;
				padding: 16px;
			}
			.btn {
				font-size: 14px;
				text-align: center;
				display: block;
				padding: 11px;
				text-decoration: none;
			}
			.btn:disabled {
				opacity: 0.5;
				transform: scale(1) !important;
			}
			.btn-main {
				color: white;
				background: var(--accent);
				border: 1px solid var(--accent);
			}
			.btn-main:hover {
				background: var(--accent-hover);
				border-color: var(--accent-hover);
			}
			.btn-main:hover:disabled {
				background: var(--accent);
				border-color: var(--accent);
			}
			.btn-outlined {
				border: 1px solid var(--accent);
				background: white;
				color: var(--accent);
			}
			.btn-outlined:hover {
				color: white;
				background: var(--accent);
				border-color: var(--accent);
			}
			.toast {
				display: flex;
				align-items: center;
				gap: 8px;
				position: fixed;
				top: 16px;
				left: 50%;
				transform: translateX(-50%);
				text-align: center;
				background: white;
				padding: 16px 24px;
				border-radius: 8px;
				box-shadow: 0 0 8px #0000006f;
				z-index: 5;
				justify-content: center;
			}
			.toast svg {
				flex-shrink: 0;
			}
			@media (max-width: 700px) {
				.title {
					font-size: 2em;
				}
				.toast {
					width: calc(100% - 32px);
					font-size: 14px;
				}
			}
		</style>
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">` + body + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "acbwds"
};
async function get_hooks() {
  return {};
}
export {
  assets as a,
  base as b,
  options as c,
  set_private_env as d,
  prerendering as e,
  set_public_env as f,
  get_hooks as g,
  set_safe_public_env as h,
  set_assets as i,
  set_building as j,
  set_manifest as k,
  set_prerendering as l,
  set_read_implementation as m,
  override as o,
  public_env as p,
  reset as r,
  safe_public_env as s
};
