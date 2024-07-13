<script>
	import { fade, fly } from "svelte/transition"
	import { cart } from "$lib/stores.js"

	export let id, src, name, price, discount, measure

	let showToast

	function addProduct() {
		cart.addItem(id, price, discount, measure)
		if ($cart.showToast === true) {
			cart.resetToast()
			showToast = true;
			setTimeout(() => {
				showToast = false;
			}, 2000);
		}
	}

	function removeProduct() {
		cart.removeItem(id, discount)
	}

</script>

{#if showToast}
	<div in:fly={{ y: -200, duration: 500 }} out:fade class="toast">
		🎉 Descuento especial por six-pack 🎉
	</div>
{/if}
<article>
	<div class="img rl">
		{#if discount}
			<div class="discount">
				{`-${(discount * 100).toFixed(0)}%`}
			</div>
		{/if}
		<div class="actions">
			<button type="button" class="atc" on:click={addProduct} title="Añadir al carrito">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#737373"><path d="M427-428H221q-22 0-37.5-15.5T168-481q0-22 15.5-37.5T221-534h206v-206q0-22 15.5-37.5T480-793q22 0 37.5 15.5T533-740v206h206q22 0 37.5 15.5T792-481q0 22-15.5 37.5T739-428H533v206q0 22-15.5 37.5T480-169q-22 0-37.5-15.5T427-222v-206Z"/></svg>
			</button>
			<button type="button" class="atc" on:click={removeProduct} title="Remover del carrito">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#737373"><path d="M221-428q-22 0-37.5-15.5T168-481q0-22 15.5-37.5T221-534h518q22 0 37.5 15.5T792-481q0 22-15.5 37.5T739-428H221Z"/></svg>
			</button>
		</div>
		<a href="/tienda/{id}" class="img-container">
			<img {src} alt="Tengo sueño jajaja">
		</a>
	</div>
	<a class="name" href="/tienda/{id}"><p>{name}</p></a>
	<div class="fc precios">
		{#if discount}
			<div class="secondary">S/&nbsp;{price.toFixed(2)}</div>
			<div class="main">S/&nbsp;{(price * (1 - discount)).toFixed(2)}</div>
		{:else}
			<div class="main">S/&nbsp;{price.toFixed(2)}</div>
		{/if}
	</div>
</article>

<style>
	article {
		font-size: 14px;
		display: flex;
    	flex-direction: column;
	}
	img {
		height: 100%;
		width: 100%;
		transition: all 0.2s ease-out;
	}
	.img-container {
		height: 100%;
		display: block;
		overflow: hidden;
	}
	.img:hover img {
		transform: scale(1.1);
	}
	.img {
		flex: 1;
	}
	.actions, .discount {
		position: absolute;
		z-index: 2;
	}
	.actions {
		right: 8px;
		top: 8px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		display: none;
	}
	article:hover .actions {
		display: flex;
	}
	.atc {
		background: #f0f0f0;
		border-radius: 50%;
		padding: 8px;
		transition: all 0.2s ease-out;
		outline: 0px solid #f0f0f0;
	}
	.atc:hover {
		background: var(--accent);
		outline: 2px solid salmon;
	}
	.atc:hover path {
		fill: white;
	}
	.discount {
		background: var(--accent);
		color: white;
		padding: 16px;
	}
	.precios {
		font-size: 16px;
		font-weight: 800;
		gap: 8px;
		justify-content: center;
	}
	.precios .secondary {
		text-decoration: line-through;
		color: var(--disabled);
	}
	.precios .main {
		color: var(--accent);
	}
	a {
		text-decoration: none;
		color: var(--text);
	}
	p {
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.name:hover {
		color: var(--accent);
	}
	@media (max-width: 700px){
		.actions {
			display: flex !important;
		}
	}
</style>