<script>
	import { fade, fly } from "svelte/transition"
	import { cart } from '$lib/stores.js'

	export let products, id, t, q

	let showToast

	function addProduct() {
		cart.addItem(id, product.price, product.discount, product.measure)
		if ($cart.showToast === true) {
			cart.resetToast()
			showToast = true;
			setTimeout(() => {
				showToast = false;
			}, 2000);
		}
	}

	$: product = products.find(p => p.id === id)
</script>

{#if showToast}
	<div in:fly={{ y: -200, duration: 500 }} out:fade class="toast">
		🎉 Descuento especial por six-pack 🎉
	</div>
{/if}
<tr>
	<td>
		<div class="fc">
			<img src={product.src} width="80" height="80" alt="Wiii producto">
			{product.name}
		</div>
	</td>
	<td class="center">S/&nbsp;{t.toFixed(2)}</td>
	<td class="center">
		<div class="fc">
			<button type="button" title="Quitar 1" on:click={cart.removeItem(id, product.discount)}>
				<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#110600"><path d="M288-444h384v-72H288v72ZM480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Z"/></svg>
			</button>
			{q}
			<button type="button" title="Aumentar 1" on:click={addProduct}>
				<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#110600"><path d="M444-288h72v-156h156v-72H516v-156h-72v156H288v72h156v156Zm36.28 192Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Z"/></svg>
			</button>
		</div>
	</td>
	<td class="center"><strong>S/&nbsp;{(t * q).toFixed(2)}</strong></td>
</tr>

<style>
	tr {
		font-size: 14px;
	}
	.center {
		text-align: center;
		word-break: keep-all;
	}
	.fc {
		gap: 16px;
	}
	.center .fc {
		gap: 4px;
		justify-content: center;
		width: 100%;
	}
	button:hover svg {
		fill: var(--accent);
	}
	@media (max-width: 420px) {
		img {
			display: none;
		}	
	}
</style>