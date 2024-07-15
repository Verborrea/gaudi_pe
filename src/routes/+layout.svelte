<script>
	import Header from "$lib/compo/Header.svelte"
	import Footer from "$lib/compo/Footer.svelte"
	import { cart } from "$lib/stores.js"
    import { onMount } from "svelte";

	export let data

	onMount(async () => {
		const res = await fetch('https://api.gaudi.pe/discount')
		
		if (!res.ok) {
			console.error(res)
			throw error(res.status)
		}

		const allowDiscount = await res.json()

		const _prev = (allowDiscount.status === $cart.allowDiscount) ?
		{
			...$cart,
			allowDiscount: allowDiscount.status
		} : {
			items: [],
			quantity: 0,
			subtotal: 0,
			nro_latas: 0,
			showToast: false,
			allowDiscount: allowDiscount.status
		}
			
		cart.set(_prev)
	})
</script>

<Header products={data.products}/>
<slot/>
<Footer/>