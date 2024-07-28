<script>
	import { fade, fly } from "svelte/transition"
	import Product from "$lib/compo/Product.svelte"
	import { cart } from "$lib/stores.js"

	export let data

	let showToast

	function addProduct() {
		cart.addItem(data.product)
		if ($cart.showToast === true) {
			cart.resetToast()
			showToast = true;
			setTimeout(() => {
				showToast = false;
			}, 2000);
		}
	}

	function removeProduct() {
		cart.removeItem(data.product)
	}

	$: cantidad = $cart.items.filter(item => item.id === data.product.id).reduce(
		(acc, cur) => acc + cur.q,
		0
	)
</script>

<svelte:head>
	<title>Gaudí | {data.product.name}</title>
</svelte:head>

{#if showToast}
	<div in:fly={{ y: -200, duration: 500 }} out:fade class="toast">
		🎉 Descuento especial por six-pack 🎉
	</div>
{/if}
<main class="ma">
	<a class="back" href="/tienda">&lt; Regresar a la tienda</a>
	<div class="cols">
		<div class="img">
			<img src={data.product.src} alt="Imagen">
		</div>
		<article>
			<h1 class="name">{data.product.name}</h1>
			<p>{data.product.description}</p>
			<div class="fc">
				<p>Tienes</p>
				<div class="fc">
					<button type="button" title="Quitar 1" on:click={removeProduct}>
						<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#110600" class="s-aS6aw414AwZi"><path d="M288-444h384v-72H288v72ZM480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Z" class="s-aS6aw414AwZi"></path></svg>
					</button>
						{cantidad}
					<button type="button" title="Aumentar 1" on:click={addProduct}>
						<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#110600" class="s-aS6aw414AwZi"><path d="M444-288h72v-156h156v-72H516v-156h-72v156H288v72h156v156Zm36.28 192Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Z" class="s-aS6aw414AwZi"></path></svg>
					</button>
				</div>
				<p>{data.product.measure}{$cart.quantity != 1 ? 's' : ''} en tu <a href="/carrito">carrito</a></p>
			</div>
		</article>
	</div>
</main>
<div class="products ma">
	<h2 class="rl title">Productos Relacionados</h2>
	<div class="plist">
		{#each data.products as product (product.id)}
		<Product
			id={product.id}
			src={product.src}
			name={product.name}
			price={product.price}
			discount={product.discount}
			measure={product.measure}
		/>
		{/each}
	</div>
</div>

<style>
	.back {
		color: var(--disabled);
		text-decoration: none;
	}
	.back:hover, .fc a {
		color: var(--accent);
		text-decoration: underline;
	}
	h1.name {
		text-align: start;
		font-weight: 400;
		font-size: 1.5em;
		letter-spacing: -0.02em;
	}
	p {
		color: var(--disabled);
	}
	.cols {
		display: flex;
		align-items: center;
		gap: 32px;
		padding-top: 16px;
	}
	.fc {
		gap: 8px;
	}
	.fc p {
		margin: 0;
	}
	img {
		width: 100%;
	}
	.cols > * {
		flex: 1;
	}
	main, .products {
		margin-block: 32px;
	}
	h2.title {
		margin-top: 0;
	}
	h2::before {
		content: '';
		position: absolute;
	}
	.plist {
		gap: 16px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
	@media (max-width: 1000px) {
		.plist {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
		}
		/* button {
			width: 100%;
		} */
	}
	@media (max-width: 700px) {
		.cols {
			flex-direction: column-reverse;
		}
		.plist {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>