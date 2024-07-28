<script>
	import { cart } from '$lib/stores.js'

	export let products, id, t, q

	$: product = products.find(p => p.id === id)
</script>

<article class="fc">
	<img src={product.src} width="80" height="80" alt="Producto seleccionado">
	<div class="text">
		<a href="/tienda/{id}"><p>{product.name}</p></a>
		<div class="details">{q} &times; S/&nbsp;{t.toFixed(2)}</div>
	</div>
	<button type="button" title="Remover elementos" on:click={cart.removeItem(product)}>
		<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#737373"><path d="M288-444h384v-72H288v72ZM480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>
	</button>
</article>

<style>
	article {
		font-size: 14px;
		gap: 8px;
		padding: 8px;
	}
	article:hover {
		background: #eee;
	}
	.details {
		color: var(--disabled);
	}
	img {
		flex-shrink: 0;
	}
	.text {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	a {
		text-decoration: none;
		color: var(--text);
	}
	a:hover {
		color: var(--accent);
	}
	p {
		margin: 0;
	}
	button:hover path {
		fill: var(--accent);
	}
</style>