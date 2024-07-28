<script>
	import Header from "$lib/compo/Header.svelte"
	import Footer from "$lib/compo/Footer.svelte"

	export let data
</script>

<Header products={data.products}/>
<slot/>
<Footer/>